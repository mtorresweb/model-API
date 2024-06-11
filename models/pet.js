const { DataTypes } = require("sequelize");
const sequelize = require("../database/index.js");

const Pet = sequelize.define("Pet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
  description: DataTypes.TEXT,
  breed: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Pet;
