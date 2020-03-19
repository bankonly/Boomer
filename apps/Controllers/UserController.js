const Res = require("./ResponseController");
const Controller = require("./Controller");

const { UserClass, User } = require("../Models/User");
const UserProvider = require("../Providers/UserProvider");
class UserController extends Controller {
  // @GET REQUEST
  async get() {
    try {
      const fetchAll = await UserClass.fetchAll({});
      this.response({ data: fetchAll });
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  async me() {
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

  // @POST REQUEST
  async post() {
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

  // @GET/{id} REQUEST
  getWithParam() {
    const id = this.params.id;
    this.response(`GET/${id} REQUEST`);
  }

  // @PUT REQUEST
  async update() {
    const isUpdated = await UserProvider.update(this.req);
    this.response(isUpdated);
  }

  // @DELETE/{id} REQUEST
  delete() {
    const id = this.params.id;
    this.response({});
  }
}

module.exports = (...args) => new UserController(...args);
