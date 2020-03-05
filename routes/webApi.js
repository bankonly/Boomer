module.exports = app => {
  app.use("/user", require("../apps/Resources/UserResource"));
  app.use("/product", require("../apps/Resources/ProductResource"));
  app.use("/productImage", require("../apps/Resources/ProductImageResource"));
};
