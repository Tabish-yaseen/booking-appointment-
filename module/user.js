const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
  },
  phoneno: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true,
  }
});

module.exports = User;
