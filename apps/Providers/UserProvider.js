const Res = require("../Controllers/DefaultResponseController");
const { User, UserQB } = require("../Models/User");
const Bcrypt = require("../Helpers/Bcrypt");
const Jwt = require("../Helpers/Jwt");
const Helper = require("../Helpers/Global");

class UserProvider {
  // get all user from database
  async getAllUser() {
    try {
      const unSelectedColumn = "-password -__v";
      const userData = await User.find().select(unSelectedColumn);
      return Res.success({ data: userData });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  //validate login
  validateLoginObj({ author, password }) {
    var msg = null;
    if (!author) msg = "author is required";
    else if (!password) msg = "password is required";

    if (msg !== null) return Res.badRequest({ msg: msg });
    return Res.success({});
  }

  // validate input
  validateUpdateObj({ phoneNumber, name, age, mail }) {
    var msg = null;
    if (!phoneNumber) msg = "phoneNUmber is required";
    else if (!name) msg = "name is required";
    else if (!age) msg = "age is required";
    else if (!mail) msg = "mail is required";

    if (msg !== null) return Res.badRequest({ msg: msg });
    return Res.success({});
  }

  // validate input
  validateRegisterObj({ phoneNumber, password, confirmPassword, mail }) {
    var msg = null;
    if (!phoneNumber) msg = "phoneNUmber is required";
    else if (!password) msg = "password is required";
    else if (!confirmPassword) msg = "confirmPassword is required";
    else if (!mail) msg = "mail is required";
    else if (password !== confirmPassword) msg = "password not matced";

    if (msg !== null) return Res.badRequest({ msg: msg });
    return Res.success({});
  }

  // register new user
  async register({ phoneNumber, password, confirmPassword, mail }) {
    try {
      /* Check phone number is already exist or not */
      const isPhoneNumberExist = await UserQB.findByPhoneNumber({
        phoneNumber: phoneNumber
      });
      if (isPhoneNumberExist !== null) {
        return Res.duplicated({ msg: "this phone number already exist" });
      }

      /* Check emakl is already exist or not */
      const isEmailExist = await UserQB.findByEmail({ email: mail });
      if (isEmailExist !== null) {
        return Res.duplicated({ msg: "this email already exist" });
      }

      // hash password
      password = await Bcrypt.hashPassword(password);

      /* build save data */
      const saveData = {
        contact: {
          phoneNumber,
          email: mail
        },
        password
      };

      /* save to database */
      const saveUserInDb = await User.create(saveData);
      if (saveUserInDb) {
        // if data is saved then return with success
        const responseData = {
          phoneNumber: saveUserInDb.contact.phoneNumber,
          email: saveUserInDb.contact.email,
          userId: saveUserInDb._id
        };
        return Res.success({ data: responseData, msg: "account created" });
      } // if not
      return Res.badRequest({ msg: "can not save data" });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  // register new user
  async update({ phoneNumber, name, age, mail, userId }) {
    try {
      if (!Helper.invalidObjectId(userId)) {
        return Res.notFound({ msg: "invalid userId" });
      }
      /* check user id */
      const userData = await User.findById(userId).select("-password -__v");
      if (userData == null) {
        return Res.notFound({ msg: "user id not found" });
      }

      /* Check phone number is already exist or not */
      const isPhoneNumberExist = await UserQB.findByPhoneNumber({
        phoneNumber: phoneNumber
      });
      if (isPhoneNumberExist !== null) {
        return Res.duplicated({ msg: "this phone number already exist" });
      }

      /* Check emakl is already exist or not */
      const isEmailExist = await UserQB.findByEmail({ email: mail });
      if (isEmailExist !== null) {
        return Res.duplicated({ msg: "this email already exist" });
      }
      // update Data
      userData.contact.phoneNumber = phoneNumber;
      userData.contact.email = mail;
      userData.name = name;
      userData.age = age;

      /* update to database */
      if (userData.save()) {
        // if data is updated then return with success
        return Res.success({ data: userData });
      } // if not
      return Res.badRequest({ msg: "can not save data" });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  // delete user by id
  async delete(userId) {
    try {
      if (!Helper.invalidObjectId(userId)) {
        return Res.notFound({ msg: "invalid userId" });
      }
      /* check user id */
      const userData = await User.findByIdAndDelete(userId);
      if (!userData) {
        return Res.notFound({ msg: "user id not found" });
      }
      return Res.deleted({});
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  // get user by id
  async getUser(userId) {
    try {
      if (!Helper.invalidObjectId(userId)) {
        return Res.notFound({ msg: "invalid userId" });
      }
      /* check user id */
      const userData = await User.findById(userId).select("-password -__v");
      if (userData == null) {
        return Res.notFound({ msg: "user id not found" });
      }
      return Res.success({ data: userData });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  // login
  async login({ author, password }) {
    try {
      var loginAuthor = null;
      const loginViaPhone = await UserQB.findByPhoneNumber({
        phoneNumber: author
      });
      const loginViaEmail = await UserQB.findByEmail({ email: author });

      if (loginViaEmail == null && loginViaPhone == null) {
        return Res.badRequest({ msg: "invalid author name" });
      }

      // if login by phone is null then use email
      if (loginViaPhone == null) loginAuthor = loginViaEmail;
      else loginAuthor = loginViaPhone;

      // check password
      if (!Bcrypt.verifyPassword(password, loginAuthor.password)) {
        return Res.badRequest({ msg: "password incorrect" });
      }

      // count login time when user generate new token ,old token will not work
      const loginCount = loginAuthor.loginCount + 1;

      loginAuthor.loginCount = loginCount
      loginAuthor.save()

      // prepare payload data
      const payload = {
        userId: loginAuthor._id,
        loginTime: loginCount
      };

      // get token
      const response = Jwt.jwtMethodWithPassport(payload, process.env.TOKEN_LIFE_TIME);
      return Res.success({
        data: {
          token: response
        }
      });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }
}

module.exports = new UserProvider();
