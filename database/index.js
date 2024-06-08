const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "breedclassifier",
  "breedclassifier",
  "breedclassifier",
  {
    host: "localhost",
    dialect: "postgres",
  },
);

module.exports = sequelize;
