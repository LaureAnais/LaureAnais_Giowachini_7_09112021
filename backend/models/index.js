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
      pool: {max: 5, min: 0, acquire: 30000, idle: 10000},
      charset: 'utf8' ,
      collate: 'utf8_general_ci' , 
      timestamps: true
    }
  );

db.sequelize = sequelize
db.Sequelize = Sequelize
db.users = require ("./User")(sequelize, Sequelize)
db.posts = require ("./Post")(sequelize, Sequelize)
db.comments = require ("./Comment")(sequelize, Sequelize)
db.likes = require ("./Like")(sequelize, Sequelize)
db.roles = require ("./Roles")(sequelize, Sequelize)

// Foreign Key on posts' table link to id_users on user's table
db.users.hasMany(db.posts, 
  { foreignKey: "user_id", 
    as: "fk_users_posts"}, 
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)
db.posts.belongsTo(db.users, 
  {foreignKey: "user_id", 
   as: "fk_users_posts"},
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)

// Foreign Key on comments' table link to id_users on users' table
db.users.hasMany(db.comments, 
  {as: "fk_users_id"}, 
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)
db.comments.belongsTo(db.users, 
  {as: "fk_users_id"},
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)

// Foreign Key on comments' table link to id_posts on posts' table
db.posts.hasMany(db.comments, 
  {as: "fk_posts_id"}, 
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)
db.comments.belongsTo(db.posts, 
  {as: "fk_posts_id"},
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)

// Foreign Key on likes' table link to id_users on users' table 
db.users.hasMany(db.likes, 
  {as: "fk_users_like_id"}, 
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)
db.likes.belongsTo(db.users, 
  {as: "fk_users_like_id",
  onDelete: 'Cascade', 
  onUpdate: 'Cascade'}
) 

// Foreign Key on likes' table link to id_posts on posts' table
db.posts.hasMany(db.likes, 
  {as: "fk_posts_like_id"}, 
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)
db.likes.belongsTo(db.users, 
  {as: "fk_posts_like_id"},
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)


module.exports = db 
