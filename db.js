var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var connectionString = "postgres://hqiutrclpopfni:db73d00de1328afec9d5d0d2f7c7841ac94c02861adbbfc20565150852fa8477@ec2-54-163-240-54.compute-1.amazonaws.com:5432/d2dl6j940g6gt0";
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize("postgres://oafmamjmvcluji:fb71f808b548e2e914cad3abf49f07706d4ce89adc64dcf81ac1470eec9b57cb@ec2-54-243-239-66.compute-1.amazonaws.com:5432/d3vajpc559mnbe", {
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-api-db.sqlite'
	});
}


var db = {};
db.todo = sequelize.import(__dirname + '/models/todo.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.token = sequelize.import(__dirname + '/models/token.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.todo.belongsTo(db.user);
db.user.hasMany(db.todo);

module.exports = db;


//REMOTES ARE SET TO API