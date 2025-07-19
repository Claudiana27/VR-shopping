const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const admin = sequelize.define('admin', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true}
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin',
  }
});

module.exports = admin;
