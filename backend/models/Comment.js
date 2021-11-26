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
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});