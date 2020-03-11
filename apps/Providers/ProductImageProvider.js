const Res = require("../Controllers/DefaultResponseController");
const { ProductImage, ProductImageClass } = require("../Models/ProductImage");

class ProductImageProvider {
  async addProductImage({ proId, proImageName }) {
    try {
      const addProductImage = await ProductImage.create(...arguments);
      if (addProductImage) return Res.success({});
      return Res.badRequest({});
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }
}

module.exports = new ProductImageProvider();
