const { use } = require("./Helpers/Global");

module.exports = {
  routeName: {
    /*
     * @ Register routeName Middleware
     * return @string
     */
    api: "/api", //  authenticate api
    app: "/app", // Unauthenticate route
    admin: "/admin",  // authenticate api admin
  },
  middlewareGroup: {
    ApiAuth: [
      /*
       * @ Register ApiAuth Middleware
       * return use(path).fromformMiddleware
       */

      use("ApiAuthentication").formMiddleware(),
    ],
    AdminAuth: [
      /*
       * @ Register AdminAuth Middleware
       * return use(path).fromMidleware
       */

      use("AdminAuthenticate").formMiddleware(),
    ],
  },
};
