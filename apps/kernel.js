const { use } = require("./Helpers/Global");

module.exports = {
  routeName: {
    /*
     * @ Register routeName Middleware
     * return @string
     */
    api: "/api",
    admin: "/admin",
    unAuthorizeApi:"/app"
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
