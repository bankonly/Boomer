/* ----- Module ----- */
const router = require("express").Router();

/* ----- File ----- */
const { routeName } = require("../apps/kernel");
const { use } = require("../apps/Helpers/Global");
const UserController = use("UserController").formController();

module.exports = app => {
  /* ----- UserController ----- */
  router.post("/user/login", (...args) => UserController(...args).login());
  router.post("/user/register", (...args) => UserController(...args).register());

  /* Excute "/api" as web service */
  app.use(routeName.unAuthorizeApi, router);
};
