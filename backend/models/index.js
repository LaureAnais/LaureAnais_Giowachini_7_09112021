const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
      operatorsAliases: false,
  
      pool: {max: 5, min: 0, acquire: 30000, idle: 10000}
    }
  );

db.sequelize = sequelize
db.Sequelize = Sequelize
db.users = require ("./User")(sequelize, Sequelize)
db.posts = require ("./Post")(sequelize, Sequelize)
db.comments = require ("./Comment")(sequelize, Sequelize)
db.likes = require ("./Like")(sequelize, Sequelize)
db.roles = require ("./Roles")(sequelize, Sequelize)
module.exports = db 
