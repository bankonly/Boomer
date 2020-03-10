module.exports = app => {
  app.use("/user", require("../apps/Resources/UserResource"));
  app.use("/exchangeRate", require("../apps/Resources/ExchangeRateResource"));
  app.use("/store", require("../apps/Resources/StoreResource"));
  app.use("/productType", require("../apps/Resources/ProductTypeResource"));
};
