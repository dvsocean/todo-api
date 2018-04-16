var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var items = [{
	sparks: {
		id: 1,
		description: "For my new engine",
		completed: false
	},
	bars: {
		id: 2,
		description: "For my new motorcycle",
		completed: false
	}
}];

var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('REST API - Designed for testing, available methods are GET, POST, PUT and DELETE. Endpoint is /items');
});

app.get('/items', function(req, res){
	res.json(items);
});

app.get('/items/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	//Replace forEach
	var found = _.findWhere(items, {id: todoId});

	// var found;
	// items.forEach(function(todo){
	// 	if(todo.id === todoId){
	// 		found = todo;
	// 	}
	// });

	if (found) {
		res.json(found);
	} else {
		res.status(404).send();
	}
});

app.post('/items', function(req, res){
	var body = _.pick(req.body, 'description', 'completed');
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	body.description = body.description.trim();

	body.id = todoNextId++;

	items.push(body);

	console.log('description :' + body.description);
	res.json(body);
});

app.delete('/items/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var found = _.findWhere(items, {id: todoId});

	if (!found) {
		res.status(404).json({"error":"NO TODO FOUND"});
	} else {
		items = _.without(items, found);
		res.json(found);
	}
});

app.put('/items/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var found = _.findWhere(items, {id: todoId});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttr = {};

	if(!found){
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttr.completed = body.completed;
	} else if (body.hasOwnProperty('completed')){
		return res.status(400).send();
	} 

	if(body.hasOwnProperty('description') && body.description.trim().length > 0){
		validAttr.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	_.extend(found, validAttr);
	res.json(found);
});

app.listen(PORT, function(){
	console.log('Express listening on port number ' + PORT + '!');
});


















