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

// // Foreign Key on posts' table link to id_users on user's table
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
  {foreignKey: "id_users",
    as: "fk_users_comments"}, 
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)
db.comments.belongsTo(db.users, 
  {foreignKey: "id_users",
    as: "fk_users_comments"},
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)

// Foreign Key on comments' table link to id_posts on posts' table
db.posts.hasMany(db.comments, 
  {foreignKey: "id_posts",
    as: "fk_posts_comments"}, 
    {onDelete: 'CASCADE'}, 
   { onUpdate: 'CASCADE'},
   // foreignKey: { allowNull: false },
   // hooks: true  
  
)
db.comments.belongsTo(db.posts, 
  {foreignKey: "id_posts",
    as: "fk_posts_comments" },
  {onDelete: 'CASCADE' },
 { onUpdate: 'CASCADE'},
  //foreignKey: { allowNull: false },
  //hooks: true  
)

// Foreign Key on likes' table link to id_users on users' table 
db.users.hasMany(db.likes, 
  {foreignKey: "id_users",
   as: "fk_users_like"}, 
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)
db.likes.belongsTo(db.users, 
  {foreignKey: "id_users",
    as: "fk_users_like",
  onDelete: 'Cascade', 
  onUpdate: 'Cascade'}
) 

// Foreign Key on likes' table link to id_posts on posts' table
db.posts.hasMany(db.likes, 
  {foreignKey: "id_posts",
    as: "fk_posts_like"}, 
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)
db.likes.belongsTo(db.users, 
  {foreignKey: "id_posts",
    as: "fk_posts_like"}, 
  {onDelete: 'Cascade'}, 
  {onUpdate: 'Cascade'}
)


module.exports = db 
