const Res = require("./ResponseController");

class ProductController {
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
      this.send.success({});
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @POST REQUEST
  post() {
    try {
      this.send.success({});
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @GET/{id} REQUEST
  getWithParam() {
    const id = this.params.id;
    try {
      this.send.success({});
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @PUT/{id} REQUEST
  update() {
    const id = this.params.id;
    try {
      this.send.success({});
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @DELETE/{id} REQUEST
  delete() {
    const id = this.params.id;
    try {
      this.send.success({});
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }
}

module.exports = (...args) => new ProductController(...args);
