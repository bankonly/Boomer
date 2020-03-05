const Express = require("express");
const app = Express();

require("./app_config/start_up_config"); // load ENV variables
require("./app_config/app")(app); // Load default Config

const { sequelize } = require("./app_config/database"); // Database config

require("./routes/webApi")(app); // ROUTE IMPORTED = webApi

sequelize.sync(); // Create table if not exist

app.listen(process.env.APP_PORT, e =>
  console.log("CONNECTED TO ", process.env.APP_PORT)
);
