const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("demo-sequelize-store", "root", null, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
