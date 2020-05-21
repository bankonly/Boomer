/* ----- Module ----- */
const router = require("express").Router();

/* ----- File ----- */
const { middlewareGroup,routeName } = require("../apps/kernel");
const { use } = require("../apps/Helpers/Global");
const UserController = use("UserController").formController();

module.exports = (app) => {
  /* ----- UserController ----- */
  router.get("/user/me", (...args) => UserController(...args).whoami());
  router.put("/user", (...args) => UserController(...args).update());

  /* Excute "/api" as web service */
  app.use(routeName.api, middlewareGroup.ApiAuth, router);
};
