// config/db.js
const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "data.sqlite3",
});

module.exports = db;