const Res = require("./ResponseController");
const { ProductImageClass, ProductImage } = require("../Models/ProductImage");

class ProductImageController {
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
    this.send.success("GET REQUEST");
  }

  // @POST REQUEST
  post() {
    this.send.success("POST REQUEST");
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

module.exports = (...args) => new ProductImageController(...args);
