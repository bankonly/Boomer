/* ----- File ----- */
const UserCtl = require("../apps/Controllers/UserController");
const passport = require('passport')

module.exports = (app, router, kernel) => {
  router.get("/user", (...args) => UserCtl(...args).get()); // get all user
  router.get("/whoami", (...args) => UserCtl(...args).whoami()); // get all user
  router.get("/user/:userId", (...args) => UserCtl(...args).getWithParam()); // get user by id
  router.put("/user/:userId", (...args) => UserCtl(...args).update());// update user data
  router.delete("/user/:userId", (...args) => UserCtl(...args).delete());// delete user data

  /* Excute "/api" as web service */
  app.use(kernel.routeName.api,passport.authenticate('jwt',{session:false}), router);
};
