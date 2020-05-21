const { use } = require("../Helpers/Global");
const Controller = require("./Controller");
const Res = use("ResponseController").formController();
const UserProvider = use("UserProvider").formProvider();
const { UserClass, User } = use("User").formModel();
class UserController extends Controller {
  async getAllUser() {
    try {
      const fetchAll = await UserClass.fetchAll({});
      this.response({ data: fetchAll });
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  async whoami() {
    try {
      const authData = await UserProvider.getAuth({
        userId: this.req.auth.userId
      });
      this.response(authData);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  async login() {
    try {
      const body = {
        phoneNumber: this.req.body.phoneNumber,
        password: this.req.body.password
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
        confirmPassword: this.body.confirmPassword
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
