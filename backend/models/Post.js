module.exports = (sequelize, DataTypes) =>
sequelize.define('posts', {
  id:{
    autoIncrement: true, 
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_author:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  picture_uploaded: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});