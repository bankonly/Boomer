/* ----- Module ----- */
const router = require("express").Router();

/* ----- File ----- */
const { middlewareGroup,routeName } = require("../apps/kernel");
const UserController = require('../apps/Controllers/UserController');

module.exports = (app) => {
  /* ----- UserController ----- */
  router.get("/user/me", (...args) => UserController(...args).whoami());
  router.put("/user", (...args) => UserController(...args).update());

  /* Excute "/api" as web service */
  app.use(routeName.api, middlewareGroup.ApiAuth, router);
};
