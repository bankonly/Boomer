const { UserClass, User } = require("../Models/User");
const Res = require("../Controllers/DefaultResponseController");
const Bcrypt = require("../Helpers/Bcrypt");
const Jwt = require("../Helpers/Jwt");
const CONSTANT = require("../../app_config/constants");
const MailProvider = require("../Providers/MailProvider");
const { sequelize } = require("../../app_config/database");

class UserProvider {
  validateResgisterObj(registerData) {
    var msg = null;
    if (!registerData.phoneNumber) msg = "phoneNumber is requried";
    else if (!registerData.password) msg = "password is requried";
    else if (!registerData.confirmPassword) msg = "confirmPassword is requried";
    else if (!registerData.mail) msg = "mail is requried";
    else if (registerData.password !== registerData.confirmPassword)
      msg = "Password is not matched";

    if (msg !== null) return Res.badRequest({ msg: msg });
    return Res.success({});
  }

  /**
   *
   *
   * @param {*} { phoneNumber, password, confirmPassword }
   * @returns
   * @memberof UserProvider
   */
  async register({ phoneNumber, mail, password, confirmPassword }) {
    var userId = null;
    try {
      const isPhoneNumber = await UserClass.findByPhoneNumber(phoneNumber);

      // Check if PhoneNumber is already exist in database
      if (isPhoneNumber !== null) {
        return Res.duplicated({ data: phoneNumber });
      }

      const isEmail = await UserClass.findByEmail(mail);
      if (isEmail !== null) {
        return Res.duplicated({ data: mail });
      }

      const hashPwd = await Bcrypt.hashPassword(password);
      if (!hashPwd) return Res.error({});

      const insertData = {
        phoneNumber: phoneNumber,
        mail: mail,
        password: hashPwd,
        loginTime: 1,
      };
      const createUser = await User.create(insertData);
      userId = createUser.id;
      if (createUser) {
        const sendMail = await MailProvider.send({
          to: mail,
          text: " FUCKER VONG ",
        });
        return Res.success({});
      }
      return Res.error({});
    } catch (error) {
      (await User.findByPk(userId)).destroy();
      return Res.somethingWrong({ error: error });
    }
  }

  validateUpdateObj(updateObject) {
    if (!updateObject.email) {
      return Res.badRequest({
        msg: "Email is requried",
      });
    }
    if (!updateObject.identityCard) {
      return Res.badRequest({
        msg: "IdentityCard is requried",
      });
    }
    return Res.success({});
  }

  async update(req) {
    var body = req.body;
    var auth = req.auth;

    try {
      const isValidate = this.validateUpdateObj(body);
      if (isValidate.code !== 200) return isValidate;

      const isUser = await UserClass.findByUserId(auth.userId);
      if (isUser == null) return Res.notFound({});

      const isEmail = await UserClass.findByEmail(body.email);
      if (isEmail !== null && isUser.email !== body.email) {
        return Res.duplicated({});
      }

      if (isUser.update(body)) {
        const response = UserClass.removeObjecj(isUser.dataValues);
        return Res.success({ data: response });
      }
      return Res.outPut({ msg: "nothing update" });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  validateLoginObj(loginObject) {
    let msg = null;
    if (!loginObject.author)
      msg = "author is requried,{name,phoneNumber.Email}";
    else if (!loginObject.password) msg = "password is requried";

    if (msg !== null) return Res.badRequest({ msg: msg });
    return Res.success({});
  }

  async getAuth({ userId }) {
    const userData = await UserClass.findByUserId(userId);
    if (userData == null) return Res.notFound({});
    const response = UserClass.removeObjecj(userData.dataValues);
    return Res.success({ data: response });
  }

  async login({ author, password }) {
    try {
      const isPhoneNumber = await UserClass.findByNameOrPhoneOrEmail(author);
      if (isPhoneNumber == null) {
        return Res.notFound({
          data: author,
          msg: "author notfound",
        });
      }

      const isPwdVerify = await Bcrypt.verifyPassword(
        password,
        isPhoneNumber.password
      );

      if (!isPwdVerify) return Res.badRequest({ msg: "Incorrect Password" });

      isPhoneNumber.update({ loginTime: (isPhoneNumber.loginTime += 1) });
      const tokenObj = UserClass.tokenObject(isPhoneNumber.dataValues);
      const token = Jwt.jwtMethod(tokenObj);

      return Res.success({ data: { token: token }, msg: "Login Success" });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  async getUser({ role, limit, authRole }) {
    try {
      /* if user role is 1 then role requried */
      if (authRole == 1) {
        var msg = null;
        if (!role) msg = "Role is requried";
        else if (!Array.isArray(role)) msg = "role should be valid array";

        if (msg !== null) return Res.badRequest({ msg: msg });
        role = role;
      } else {
        /* normal user */
        role = CONSTANT.userRole.split(",");
      }
      const userData = await UserClass.fetchAll({
        role: role,
        limit: limit,
      });

      return Res.success({ data: userData });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }
}

module.exports = new UserProvider();
