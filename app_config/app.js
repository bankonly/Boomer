var bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport')

const Controller = require("../apps/Controllers/Controller");

module.exports = app => {

  // passport initialize
  app.use(passport.initialize());


  // allow cors origin
  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse application/json
  app.use(bodyParser.json());
};
