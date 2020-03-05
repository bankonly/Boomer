module.exports = app => {
  app.use("/user", require("../apps/Resources/UserResource"));
};
