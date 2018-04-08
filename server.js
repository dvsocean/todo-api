var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet Jason for lunch',
	completed: false
}, {
	id: 2,
	description: 'Pickup microchips from store',
	completed: false
}, {
	id: 3,
	description: 'Re-run the deployment model',
	completed: false
}];

app.get('/', function(req, res){
	res.send('Todo API ROOT');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var found;
	todos.forEach(function(todo){
		if(todo.id === todoId){
			found = todo;
		}
	});
	if (found) {
		res.json(found);
	} else {
		res.status(404).send();
	}
	// res.send('Asking for todo with id of: ' + req.params.id);
});

app.listen(PORT, function(){
	console.log('Express listening on port number ' + PORT + '!');
});