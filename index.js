const express = require("express");
const app = express();
const router = require("express").Router();
const log = require("chalk");


/* LOAD ALL DEFAULT CONFIGURATIONS */
require("./app_config/start_up_config");
require("./app_config/app")(app);

/* FILE IMPORTED Store Midlleares and config for route */
const kernel = require("./apps/kernel");


/* LOAD IMAGE PATH */
app.use("/public", express.static(__dirname + "/public"));

/* ROUTES */
require("./routes/api")(app,router,kernel); /* api */
require("./routes/app")(app,router,kernel); /* app api */
require("./routes/admin")(app,router,kernel); /* admin api */

try {
  /* RUN PROGRAM BASE ON ENV PORT */
  app.listen(process.env.APP_PORT, (e) =>
    console.log("CONNECTED TO ", process.env.APP_PORT)
  );
} catch (error) {
  console.log(log.red(error.message));
}
