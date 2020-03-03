class ProductTypeController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  getAllProductTypes() {
    this.res.send("HELELEOEO FROm CLASS");
  }
}

module.exports = (...args) => new ProductTypeController(...args);
