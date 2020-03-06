const Res = require("./ResponseController");
const { UserClass, User } = require("../Models/User");
const UserProvider = require("../Providers/UserProvider");
class UserController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.params = req.params;
    this.body = req.body;
    this.send = Res(res);
  }

  // @GET REQUEST
  async get() {
    try {
      const fetchAll = await UserClass.fetchAll({});
      this.send.success({ data: fetchAll });
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  async me() {
    try {
      const authData = await UserProvider.getAuth({
        userId: this.req.auth.userId
      });
      this.send.success(authData);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  async login() {
    try {
      const body = {
        phoneNumber: this.req.body.phoneNumber,
        password: this.req.body.password
      };
      console.log(body);
      const isValidate = UserProvider.validateLoginObj(body);
      if (isValidate.code !== 200) return this.send.badRequest(isValidate);

      const authData = await UserProvider.login(body);
      this.send.success(authData);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @POST REQUEST
  async post() {
    const isRegistered = await UserProvider.register(this.body);
    this.send.success(isRegistered);
  }

  // @GET/{id} REQUEST
  getWithParam() {
    const id = this.params.id;
    this.send.success(`GET/${id} REQUEST`);
  }

  // @PUT REQUEST
  async update() {
    const isUpdated = await UserProvider.update(this.req);
    this.send.success(isUpdated);
  }

  // @DELETE/{id} REQUEST
  delete() {
    const id = this.params.id;
    this.send.success({});
  }
}

module.exports = (...args) => new UserController(...args);
