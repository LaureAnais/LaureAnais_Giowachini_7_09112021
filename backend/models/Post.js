module.exports = (sequelize, DataTypes) =>
sequelize.define('posts', {
  id:{
    autoIncrement: true, 
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  user_id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', key: 'id'
    }
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