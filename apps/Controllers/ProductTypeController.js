const Res = require("./ResponseController");
const { ProductType, ProductTypeClass } = require("../Models/ProductType");
const ProTypeProvider = require("../Providers/ProductTypeProvider");

class ProductTypeController {
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
      const fetchAll = await ProductTypeClass.fetchAll({exclude:['deletedAt']});
      this.send.success({ data: fetchAll });
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @POST REQUEST
  async post() {
    try {
      const body = {
        proTypeName: this.body.proTypeName
      };

      const isValidate = ProTypeProvider.validateCreateObj(body);
      if (isValidate.code !== 200) return this.send.badRequest(isValidate);

      const createProType = await ProTypeProvider.createProductType(body);
      if (createProType.code == 200) {
        delete createProType.data.dataValues.createdAt;
        delete createProType.data.dataValues.updatedAt;
        return this.send.success(createProType);
      }
      return this.send.badRequest(createProType);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @GET/{id} REQUEST
  async getWithParam() {
    const id = this.params.id;
    try {
      const isProType = await ProTypeProvider.getProductType({ proTypeId: id });
      if (isProType.code == 200) {
        return this.send.success(isProType);
      }
      return this.send.badRequest(isProType);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @PUT/{id} REQUEST
  async update() {
    try {
      const id = this.params.id;
      const body = {
        proTypeName: this.body.proTypeName
      };

      const isValidate = ProTypeProvider.validateCreateObj(body);
      if (isValidate.code !== 200) return this.send.badRequest(isValidate);

      const createProType = await ProTypeProvider.updateProductType(id, body);
      if (createProType.code == 200) {
        delete createProType.data.createdAt;
        delete createProType.data.updatedAt;
        delete createProType.data.deletedAt;
        return this.send.success(createProType);
      }
      return this.send.badRequest(createProType);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @DELETE/{id} REQUEST
  async delete() {
    const id = this.params.id;
    try {
      const isProtypeDel = await ProTypeProvider.destroyProductType({
        proTypeId: id
      });
      if (isProtypeDel.code == 200) {
        return this.send.success({});
      }
      return this.send.badRequest(isProtypeDel);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }
}

module.exports = (...args) => new ProductTypeController(...args);
