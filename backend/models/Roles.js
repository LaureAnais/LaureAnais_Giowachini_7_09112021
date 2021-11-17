module.exports = (sequelize, DataTypes) =>
sequelize.define('roles', {
  id:{
    autoIncrement: true, 
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  id_user:{
      type: DataTypes.INTEGER,
      allowNull: false, 
  },
  message: {
      type: DataTypes.STRING,
      allowNull: false, 
  }

});