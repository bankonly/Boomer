/* ----- File ----- */

module.exports = (app, router, kernel) => {
  /* Excute "/app" as web service unauthenticate */
  app.use(kernel.routeName.admin, router);
};
