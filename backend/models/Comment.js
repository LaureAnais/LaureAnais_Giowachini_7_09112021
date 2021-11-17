module.exports = (sequelize, DataTypes) =>
sequelize.define('comments', {
  id:{
    autoIncrement: true, 
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_users:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_posts:{ 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});