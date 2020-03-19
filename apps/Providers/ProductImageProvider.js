const Res = require("../Controllers/DefaultResponseController");
const { ProductImage, ProductImageClass } = require("../Models/ProductImage");

class ProductImageProvider {
  async addProductImage(bulkInsertData) {
    try {
      const addProductImage = await ProductImage.bulkCreate(bulkInsertData);
      if (addProductImage) return Res.success({});
      return Res.badRequest({});
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }

  buildInsertData(proId, images) {
    try {
      const insertData = [];
      for (var i = 0; i < images.length; i++) {
        insertData.push({
          proImageName: images[i].filename,
          proId: proId
        });
      }
      return Res.success({ data: insertData });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }
}

module.exports = new ProductImageProvider();
