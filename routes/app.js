/* ----- File ----- */
const { middlewareGroup,routeName } = require("../apps/kernel");
const UserController = require('../apps/Controllers/UserController');

module.exports = (app,router,kernel) => {
  /* ----- UserController ----- */
  router.post("/login", (...args) => UserController(...args).login());
  router.post("/register", (...args) => UserController(...args).register());

  /* Excute "/app" as web service unauthenticate */
  app.use(kernel.routeName.app, router);
};
