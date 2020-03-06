const bycrypt = require("bcrypt");

class BcryptHelper {
  async hashPassword(password, round = 10) {
    return await bycrypt.hash(password, round);
  }

  async verifyPassword(password, hashedPassword) {
    return await bycrypt.compare(password, hashedPassword);
  }
}

module.exports = new BcryptHelper();
