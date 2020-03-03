const Express = require("express");
const app = Express();

// app_config Load
require("./app_config/start_up_config"); // load ENV variables

// ROUTE IMPORTED = webApi
require("./routes/webApi")(app);


app.listen(process.env.APP_PORT,(e)=>console.log("CONNECTED TO ",process.env.APP_PORT))