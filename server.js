var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Todo API ROOT');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

//GET /todos
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var found = _.findWhere(todos, {id: todoId});

	// var found;
	// todos.forEach(function(todo){
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

//POST /todos
app.post('/todos', function(req, res){
	var body = _.pick(req.body, 'description', 'completed');
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}
	//set body.des to trimmed value
	body.description = body.description.trim();

// ADD ID FIELD
	body.id = todoNextId++;
//PUSH INTO ARRAY
	todos.push(body);

	console.log('description ' + body.description);
	res.json(body);
});

//DELETE /todos/:id
app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var found = _.findWhere(todos, {id: todoId});

	if (!found) {
		res.status(404).json({"error":"NO TODO FOUND"});
	} else {
		todos = _.without(todos, found);
		res.json(found);
	}
});

app.listen(PORT, function(){
	console.log('Express listening on port number ' + PORT + '!');
});


















