const Res = require("../Controllers/DefaultResponseController");
const { isFloat, isInt } = require("../Helpers/Global");

// MODELS
const { Product, ProductClass } = require("../Models/Product");
const { ProductTypeClass } = require("../Models/ProductType");
const { StoreClass } = require("../Models/Store");

class ProductProvider {
  validateCreateObj(createObj) {
    if (!createObj.proPrice && !isFloat(createObj.proPrice)) {
      return Res.badRequest({ msg: "proPrice is requried Float" });
    }
    if (!createObj.proTypeId) {
      return Res.badRequest({ msg: "proTypeId is requried" });
    }
    if (!createObj.proQuantity && !isInt(createObj.proQuantity)) {
      return Res.badRequest({ msg: "proQuantity is requried Integer" });
    }
    if (!createObj.proDesc) {
      return Res.badRequest({ msg: "proDesc is requried" });
    }
    if (!createObj.storeId) {
      return Res.badRequest({ msg: "storeId is requried" });
    }
    if (!createObj.proName) {
      return Res.badRequest({ msg: "proName is requried" });
    }
    return Res.success({});
  }

  async addProduct({
    proPrice,
    proTypeId,
    proQuantity,
    proDesc,
    storeId,
    proName
  }) {
    try {
      const isProType = await ProductTypeClass.findByProTypeId(proTypeId, {});
      if (isProType == null) {
        return Res.notFound({ msg: "ProTypeId does not exist" });
      }

      const isStore = await StoreClass.findByStoreId(storeId, {});
      if (isStore == null) {
        return Res.notFound({ msg: "StoreId does not exist" });
      }

      const isAddProduct = await Product.create(...arguments);
      if (!isAddProduct) {
        return Res.badRequest({ msg: "Can not Add Product" });
      }
      return Res.success({ data: isAddProduct.dataValues });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }

  async updateProduct(
    proId,
    { proPrice, proTypeId, proQuantity, proDesc, storeId, proName }
  ) {
    try {
      const isProduct = await ProductClass.findByProId(proId,{});
      if (isProduct == null) {
        return Res.notFound({ msg: "This ID does not exist" });
      }

      const isProType = await ProductTypeClass.findByProTypeId(proTypeId, {});
      if (isProType == null) {
        return Res.notFound({ msg: "ProTypeId does not exist" });
      }

      const isStore = await StoreClass.findByStoreId(storeId, {});
      if (isStore == null) {
        return Res.notFound({ msg: "StoreId does not exist" });
      }

      const updateData = {
        proPrice,
        proTypeId,
        proQuantity,
        proDesc,
        storeId,
        proName
      };

      if (!isProduct.update(updateData)) {
        return Res.badRequest({ msg: "Can not update Product" });
      }
      return Res.success({ data: isProduct.dataValues });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }

  async getProduct({ proId }) {
    try {
      const isProduct = await ProductClass.findByProIdWithStore(proId,{});
      if (isProduct == null) {
        return Res.notFound({ msg: "This ID does not exist" });
      }
      return Res.success({ data: isProduct.dataValues });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }

  async destroyProduct({ proId }) {
    try {
      const isProduct = await ProductClass.findByProId(proId,{});
      if (isProduct == null) {
        return Res.notFound({ msg: "This ID does not exist" });
      }

      if (await isProduct.destroy()) {
        return Res.success({});
      }
      return Res.badRequest({ msg: "can not delete" });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }
}

module.exports = new ProductProvider();
