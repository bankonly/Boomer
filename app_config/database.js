const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DRIVER
  }
);
sequelize
  .authenticate()
  .then(() => console.log("DATABASE CONNECTED"))
  .catch(err => console.error("DATABASE CONNECTION ERROR:", err));

module.exports = {
  sequelize,
  Sequelize
};
