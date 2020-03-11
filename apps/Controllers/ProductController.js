const Res = require("./ResponseController");
const { ProductClass } = require("../Models/Product");
const ProductProvider = require("../Providers/ProductProvider");

class ProductController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.params = req.params;
    this.body = req.body;
    this.send = Res(res);
    this.response = Res(res).success;
  }

  // @GET REQUEST
  async get() {
    try {
      const fetchAll = await ProductClass.fetchhAllWithStore({});
      this.send.success({ data: fetchAll });
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @POST REQUEST
  async post() {
    try {
      const body = {
        proPrice: this.body.proPrice,
        proTypeId: this.body.proTypeId,
        proQuantity: this.body.proQuantity,
        proDesc: this.body.proDesc,
        storeId: this.body.storeId,
        proName: this.body.proName
      };

      const addProduct = await ProductProvider.addProduct(body);
      if (addProduct.code == 200) {
        delete addProduct.data.createdAt
        delete addProduct.data.updatedAt
        return this.response(addProduct);
      }
      this.response(addProduct);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @GET/{id} REQUEST
  async getWithParam() {
    const id = this.params.id;
    try {
      const isProduct = await ProductProvider.getProduct({ proId: id });
      this.send.success(isProduct);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @PUT/{id} REQUEST
  async update() {
    const id = this.params.id;
    try {
      const body = {
        proPrice: this.body.proPrice,
        proTypeId: this.body.proTypeId,
        proQuantity: this.body.proQuantity,
        proDesc: this.body.proDesc,
        storeId: this.body.storeId,
        proName: this.body.proName
      };

      const updateProduct = await ProductProvider.updateProduct(id, body);
      if (updateProduct.code == 200) {
        return this.response(updateProduct);
      }
      this.response(updateProduct);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @DELETE/{id} REQUEST
  async delete() {
    const id = this.params.id;
    try {
      const isProduct = await ProductProvider.destroyProduct({ proId: id });
      return this.response(isProduct);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }
}

module.exports = (...args) => new ProductController(...args);
