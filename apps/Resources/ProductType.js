const router = require("express").Router();
const ProductTypeController = require("../Controllers/ProductTypeController");

router.get("/", (...args) =>
  ProductTypeController(...args).getAllProductTypes()
);

module.exports = router;
