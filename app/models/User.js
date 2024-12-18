const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrements: true, primaryKey: true },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = User;
