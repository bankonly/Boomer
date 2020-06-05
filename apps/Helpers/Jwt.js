const jwt = require("jsonwebtoken");
const _ = require("lodash");
const CONSTANT = require('../../app_config/constants')

class JwtHelper {
  jwtMethod(userObject,expireIn) {
    return jwt.sign(userObject, process.env.SECRET_KEY, {
      expiresIn: expireIn
    });
  }

  jwtMethodWithPassport(userObject,expireIn) {
    return jwt.sign(userObject, CONSTANT.PRIVATE_KEY, {
      expiresIn: expireIn,algorithm:CONSTANT.JWT_ALGORITHMS
    });
  }
  apiKeyMethod(userObject) {
    const apiKey = this.jwtMethod(userObject);
    const update = { apiKey: apiKey };
    userObject.update(update);
    return userObject;
  }
}

module.exports = new JwtHelper();
