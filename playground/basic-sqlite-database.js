var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/db.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync().then(function() {
	console.log("Everything synced!");

//PULL FROM DB
	Todo.findById(3).then(function(found){
		console.log(found.toJSON());
	});

//ADD NEW ITEM TO SQLITE
	// Todo.create({
	// 	description: 'You chased me down, seeked me out',
	// 	completed: false
	// }).then(function(todo) {
	// 	// console.log('Finished!');
	// 	// console.log(todo);
	// 	return Todo.create({
	// 		description: 'get that dev job'
	// 	});
	// }).then(function(){
	// 	//return Todo.findById(1);
	// 	return Todo.findAll({
	// 		where:{
	// 			description: {
	// 				$like: '%seeked%'
	// 			}
	// 		}
	// 	});
	// }).then(function(todos){
	// 	if (todos) {
	// 		todos.forEach(function(td){
	// 			console.log(td.toJSON());
	// 		});
	// 		console.log(todos.toJSON());
	// 	} else {
	// 		console.log("Nothing found");
	// 	}
	// }).catch(function(e){

	// });
});












