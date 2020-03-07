const Res = require("./ResponseController");

class StoreController {
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
    this.send.success({});
  }

  // @POST REQUEST
  post() {
    this.send.success({});
  }

  // @GET/{id} REQUEST
  getWithParam() {
    const id = this.params.id;
    this.send.success({});
  }

  // @PUT/{id} REQUEST
  update() {
    const id = this.params.id;
    this.send.success({});
  }

  // @DELETE/{id} REQUEST
  delete() {
    const id = this.params.id;
    this.send.success({});
  }
}

module.exports = (...args) => new StoreController(...args);
