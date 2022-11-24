// config/db.seed.js
const db = require("./bd");
const User = require("../apis/users/user_model");
const Ordenes = require("../apis/ordenes/ordenes_model");
const seed = async () => {
  await db.sync({ force: true });
};

seed();