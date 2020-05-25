const Controller = require("./Controller");
const Res = require("./ResponseController");
const UserProvider = require("../Providers/UserProvider");
const { UserClass, User } = require("../Models/User");
const CONSTANT = require("../../app_config/constants");

class UserController extends Controller {
  async getUser() {
    try {
      const fetchAll = await UserProvider.getUser({
        role: this.body.role,
        limit: CONSTANT.fetchLimit,
        authRole: this.req.auth.role,
      });

      this.response(fetchAll);
    } catch (err) {
      console.log(err.message);
      this.responseError({});
    }
  }

  async whoami() {
    try {
      const authData = await UserProvider.getAuth({
        userId: this.req.auth.userId,
      });
      this.response(authData);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  async login() {
    try {
      const body = {
        author: this.req.body.author,
        password: this.req.body.password,
      };

      const isValidate = UserProvider.validateLoginObj(body);
      if (isValidate.code !== 200) return this.send.badRequest(isValidate);

      const authData = await UserProvider.login(body);
      this.response(authData);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  async register() {
    try {
      const body = {
        phoneNumber: this.body.phoneNumber,
        password: this.body.password,
        confirmPassword: this.body.confirmPassword,
      };

      const isValidate = UserProvider.validateResgisterObj(body);
      if (isValidate.code !== 200) return this.send.badRequest(isValidate);

      const isRegistered = await UserProvider.register(body);
      this.response(isRegistered);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  getWithParam() {
    const id = this.params.id;
    this.response(`GET/${id} REQUEST`);
  }

  // @PUT REQUEST
  async update() {
    const isUpdated = await UserProvider.update(this.req);
    this.response(isUpdated);
  }

  delete() {
    const id = this.params.id;
    this.response({});
  }
}

module.exports = (...args) => new UserController(...args);
