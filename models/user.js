const { DataTypes } = require("sequelize");
const sequelize = require("../database/index.js");
const Pet = require("./pet.js");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Pet, {
  foreignKey: "userId",
  sourceKey: "id",
});

Pet.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id",
});

module.exports = User;
