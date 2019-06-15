'use strict'

const Sequelize = require('sequelize');  
const env = require('./env');  
const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {  
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  define: {
    underscored: true
  }
});


const db = {};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.users = require('../models/users.js')(sequelize, Sequelize);  
db.comments = require('../models/comments.js')(sequelize, Sequelize);  
db.posts = require('../models/posts.js')(sequelize, Sequelize);  

db.comments.belongsTo(db.posts);  
db.posts.hasMany(db.comments);  
db.posts.belongsTo(db.users);  
db.users.hasMany(db.posts);

module.exports = db;  