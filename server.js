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

//GET REQUEST FOR /todos
app.get('/todos', function(req, res){
	res.json(todos);
});

//GET INDIVIDUAL TODOS /todos/id

app.listen(PORT, function(){
	console.log('Express listening on port number ' + PORT + '!');
});