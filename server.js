var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;
var items = [];

var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('REST API - Designed for testing, available methods are GET, POST, PUT and DELETE. Endpoint is /items');
});

app.get('/items', function(req, res) {
	var query = req.query;
	var where = {};
	if(query.hasOwnProperty('completed') && query.completed === 'true'){
		where.completed = true;
	} else if (query.hasOwnProperty('completed') && query.completed === 'false') {
		where.completed = false;
	}

	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where.description = {
			$like: '%'+ query.q + '%'
		};
	}

	db.todo.findAll({where: where}).then(function(todos){
		res.json(todos);
	}, function(e){
		res.status(500).send();
	});
});

app.get('/items/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	db.todo.findById(todoId).then(function(todo){
		if (!!todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});
});

app.post('/items', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	db.todo.create(body).then(function(todo){
		res.json(todo.toJSON());
	}, function(e){
		res.status(400).json(e);
	});
});

app.delete('/items/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var found = _.findWhere(items, {
		id: todoId
	});

	if (!found) {
		res.status(404).json({
			"error": "NO TODO FOUND"
		});
	} else {
		items = _.without(items, found);
		res.json(found);
	}
});

app.put('/items/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var found = _.findWhere(items, {
		id: todoId
	});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttr = {};

	if (!found) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttr.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if (body.hasOwnProperty('description') && body.description.trim().length > 0) {
		validAttr.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	_.extend(found, validAttr);
	res.json(found);
});

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port number ' + PORT + '!');
	});
});