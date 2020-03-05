const Res = require("./ResponseController");
const { UserClass, User } = require("../Models/User");

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
  get() {
    try {
      const fetchAll = UserClass.fetchAll();
      this.send.success({ data: fetchAll });
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @POST REQUEST
  post() {
    this.send.success({data:this.body});
  }

  // @GET/{id} REQUEST
  getWithParam() {
    const id = this.params.id;
    this.send.success(`GET/${id} REQUEST`);
  }

  // @PUT/{id} REQUEST
  update() {
    const id = this.params.id;
    this.send.success(`PUT/${id} REQUEST`);
  }

  // @DELETE/{id} REQUEST
  delete() {
    const id = this.params.id;
    this.send.success(`DELETE/${id} REQUEST`);
  }
}

module.exports = (...args) => new UserController(...args);
