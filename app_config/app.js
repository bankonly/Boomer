var bodyParser = require("body-parser");
const cors = require("cors");
const formData = require("express-form-data");

const Controller = require("../apps/Controllers/Controller");

module.exports = app => {
  // allow cors origin
  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse application/json
  app.use(bodyParser.json());
};
