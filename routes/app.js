/* ----- File ----- */
const UserCtl = require("../apps/Controllers/UserController");

module.exports = (app,router,kernel) => {

  router.post("/register", (...args) => UserCtl(...args).register()); // create user
  router.post("/login", (...args) => UserCtl(...args).login()); // login user

  /* Excute "/app" as web service unauthenticate */
  app.use(kernel.routeName.app, router);
};
