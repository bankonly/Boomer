const jwt = require("jsonwebtoken");
const _ = require("lodash");

class JwtHelper {
  jwtMethod(userObject) {
    return jwt.sign(userObject, process.env.SECRET_KEY, {
      expiresIn: "120h"
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
