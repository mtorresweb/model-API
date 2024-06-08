const { DataTypes } = require("sequelize");
const sequelize = require("../database/index.js");

const Pet = sequelize.define("Pet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: DataTypes.STRING,
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Pet;
