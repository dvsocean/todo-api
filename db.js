var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var connectionString = "postgres://hqiutrclpopfni:db73d00de1328afec9d5d0d2f7c7841ac94c02861adbbfc20565150852fa8477@ec2-54-163-240-54.compute-1.amazonaws.com:5432/d2dl6j940g6gt0";
var sequelize;

if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL + '?ssl=true', {
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
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


//REMOTES ARE SET TO API