const Res = require("../Controllers/ResponseController");
const Jwt = require("jsonwebtoken");
const { UserClass } = require("../Models/User");

const ApiAuthentication = async (req, res, next) => {
  const send = Res(res);
  try {
    let token = req.headers.authorization.split(" ")[1];
    const decoded = Jwt.verify(token, process.env.SECRET_KEY);

    /* Get USer Data */
    const UserData = await UserClass.findByUserId(decoded.userId);

    /* Check User Data exist */
    if (UserClass == null) return send.unAuthorized({});
    /* Check if login time match and role is 0 */
    if (
      UserData.dataValues.loginTime == decoded.loginTime &&
      UserData.dataValues.role == 0
    ) {
      /* SET USER DATA */
      req.auth = decoded;
      req.auth.role = UserData.dataValues.role
      return next();
    }

    return send.unAuthorized({});
  } catch (error) {
    return send.unAuthorized({});
  }
};

module.exports = ApiAuthentication;
