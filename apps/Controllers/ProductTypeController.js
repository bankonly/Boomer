const Res = require("./ResponseController");
const Controller = require("./Controller");
const { ProductType, ProductTypeClass } = require("../Models/ProductType");
const ProTypeProvider = require("../Providers/ProductTypeProvider");

class ProductTypeController extends Controller {
  // @GET REQUEST
  async get() {
    try {
      const fetchAll = await ProductTypeClass.fetchAll({
        exclude: ["deletedAt"]
      });
      this.response({ data: fetchAll });
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  // @POST REQUEST
  async post() {
    try {
      const body = {
        proTypeName: this.body.proTypeName
      };

      const isValidate = ProTypeProvider.validateCreateObj(body);
      if (isValidate.code !== 200) return this.response(isValidate);

      const createProType = await ProTypeProvider.createProductType(body);
      if (createProType.code == 200) {
        delete createProType.data.createdAt;
        delete createProType.data.updatedAt;
      }
      return this.response(createProType);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  // @GET/{id} REQUEST
  async getWithParam() {
    const id = this.params.id;
    try {
      const isProType = await ProTypeProvider.getProductType({ proTypeId: id });
      return this.response(isProType);
    } catch (err) {
      this.responseError({ msg: err.message });
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
      if (isValidate.code !== 200) return this.response(isValidate);

      const createProType = await ProTypeProvider.updateProductType(id, body);
      if (createProType.code == 200) {
        delete createProType.data.createdAt;
        delete createProType.data.updatedAt;
        delete createProType.data.deletedAt;
      }
      return this.response(createProType);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  // @DELETE/{id} REQUEST
  async delete() {
    const id = this.params.id;
    try {
      const isProtypeDel = await ProTypeProvider.destroyProductType({
        proTypeId: id
      });
      return this.response(isProtypeDel);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }
}

module.exports = (...args) => new ProductTypeController(...args);
