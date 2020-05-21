const express = require("express");
const app = express();
const log = require("chalk");

/* LOAD ALL DEFAULT CONFIGURATIONS */
require("./app_config/start_up_config");
require("./app_config/app")(app);

/* LOAD IMAGE PATH */
app.use("/public", express.static(__dirname + "/public"));

/* LOAD DATABASE CONFIG */
const { sequelize } = require("./app_config/database");

/* ROUTES */
require("./routes/authenticateApi")(app); /* authenicate api */
require("./routes/unAuthenticateApi")(app); /* unauthenicate api */

/* CREATE TABLE IF NOT EXIST */
sequelize.sync();

try {
  /* RUN PROGRAM BASE ON ENV PORT */
  app.listen(process.env.APP_PORT, (e) =>
    console.log("CONNECTED TO ", process.env.APP_PORT)
  );
} catch (error) {
  console.log(log.red(error.message));
}
