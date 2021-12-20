module.exports = (sequelize, DataTypes) =>
sequelize.define('likes', {
  id:{
    autoIncrement: true, 
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_users:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', key: 'id'
    }
  },
  id_posts:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'posts', key: 'id'
    }
  },
  postlikes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  postdislikes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
});