module.exports = (sequelize, DataTypes) =>
sequelize.define('users', {
  id:{
    autoIncrement: true, 
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "email_unique"
  },
  pseudo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: "pseudo_unique"
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  }, 
  id_roles: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});