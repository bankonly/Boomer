/* ----- File ----- */
const UserCtl = require("../apps/Controllers/UserController");
const ExcCtl = require("../apps/Controllers/ExchangeRateController");

module.exports = (app, router, kernel) => {
  /* ----- UserController ----- */
  router.get("/user/me", (...args) => UserCtl(...args).whoami());
  router.get("/user", (...args) => UserCtl(...args).getUser());
  router.put("/user", (...args) => UserCtl(...args).update());

  /* ----- ExchangeRateController ----- */
  router.get("/exchangeRate", (...args) => ExcCtl(...args).get());
  router.get("/exchangeRate/:id", (...args) => ExcCtl(...args).getWithParam());

  /* Excute "/api" as web service */
  app.use(kernel.routeName.api, kernel.middlewareGroup.ApiAuth, router);
};
