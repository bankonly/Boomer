/* ----- File ----- */

const UserCtl = require("../apps/Controllers/UserController");
const ExcCtl = require("../apps/Controllers/ExchangeRateController");

module.exports = (app, router, kernel) => {
  /* ----- UserController ----- */
  router.get("/me", (...args) => UserCtl(...args).whoami());
  router.put("/updateProfile", (...args) => UserCtl(...args).update());
  router.get("/getAllUser", (...args) => UserCtl(...args).getUser());
  /* ----- ExchangeRateController ----- */
  router.get("/exchangeRate", (...args) => ExcCtl(...args).get());
  router.post("/exchangeRate", (...args) => ExcCtl(...args).post());
  router.get("/exchangeRate/:id", (...args) => ExcCtl(...args).getWithParam());
  router.put("/exchangeRate/:id", (...args) => ExcCtl(...args).update());
  router.delete("/exchangeRate/:id", (...args) => ExcCtl(...args).delete());

  /* Excute "/app" as web service unauthenticate */
  app.use(kernel.routeName.admin, kernel.middlewareGroup.AdminAuth, router);
};
