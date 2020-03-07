module.exports = app => {
  app.use("/user", require("../apps/Resources/UserResource"));
  app.use("/exchangeRate", require("../apps/Resources/ExchangeRateResource"));

  app.use("/product", require("../apps/Resources/ProductResource"));
  app.use("/productImage", require("../apps/Resources/ProductImageResource"));
};
