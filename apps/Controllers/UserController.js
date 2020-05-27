const Controller = require("./Controller");
const Res = require("./DefaultResponseController");
const UserProvider = require("../Providers/UserProvider");
const { UserClass, User } = require("../Models/User");
const CONSTANT = require("../../app_config/constants");
const { log } = require("../Providers/ActivityLogProvider");

class UserController extends Controller {
  async getUser() {
    var response = Res.success({});
    try {
      response = await UserProvider.getUser({
        role: this.body.role,
        limit: CONSTANT.fetchLimit,
        authRole: this.req.auth.role,
        isActive:this.body.isActive
      });
    } catch (err) {
      response = Res.somethingWrong({ error: err });
    }
    log(this.req, response);
    return this.response(response);
  }

  async whoami() {
    var response = Res.success({});
    try {
      response = await UserProvider.getAuth({
        userId: this.req.auth.userId,
      });
    } catch (err) {
      response = Res.somethingWrong({ error: err });
    }
    log(this.req, response);
    return this.response(response);
  }

  async login() {
    var response = Res.success({});
    try {
      const body = {
        author: this.req.body.author,
        password: this.req.body.password,
      };

      const isValidate = UserProvider.validateLoginObj(body);
      if (isValidate.code !== 200) {
        response = isValidate;
      } else {
        response = await UserProvider.login(body);
      }
    } catch (err) {
      response = Res.somethingWrong({ error: err });
    }
    log(this.req, response);
    return this.response(response);
  }

  async register() {
    var response = Res.success({});
    try {
      const body = {
        phoneNumber: this.body.phoneNumber,
        password: this.body.password,
        confirmPassword: this.body.confirmPassword,
        mail: this.body.mail,
      };

      const isValidate = UserProvider.validateResgisterObj(body);
      if (isValidate.code !== 200) {
        response = isValidate;
      } else {
        response = await UserProvider.register(body);
      }
    } catch (err) {
      response = Res.somethingWrong({ error: err });
    }
    log(this.req, response);
    return this.response(response);
  }

  getWithParam() {
    const id = this.params.id;
    this.response(`GET/${id} REQUEST`);
  }

  // @PUT REQUEST
  async update() {
    const isUpdated = await UserProvider.update(this.req);
    log(this.req, isUpdated,"log.json","db");
    this.response(isUpdated);
  }

  delete() {
    const id = this.params.id;
    // log(this.req, response);
    this.response({});
  }
}

module.exports = (...args) => new UserController(...args);
