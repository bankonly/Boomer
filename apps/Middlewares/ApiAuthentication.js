const Res = require("../Controllers/ResponseController");
const Jwt = require("jsonwebtoken");

const ApiAuthentication = (req, res, next) => {
  const send = Res(res);
  try {
    let token = req.headers.authorization.split(" ")[1];
    const decoded = Jwt.verify(token, process.env.SECRET_KEY);
    req.auth = decoded;
    return next();
  } catch (error) {
    return send.unAuthorized({});
  }
};

module.exports = ApiAuthentication;
