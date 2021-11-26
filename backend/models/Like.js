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
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});