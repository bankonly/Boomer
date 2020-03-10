const Res = require("../Controllers/DefaultResponseController");

class ProductProvider {
  validateCreateObj(createObj) {
    if (!createObj.proPrice) {
      return Res.badRequest({ msg: "proPrice is requried" });
    }
    if (!createObj.proTypeId) {
      return Res.badRequest({ msg: "proTypeId is requried" });
    }
    if (!createObj.proQuantity) {
      return Res.badRequest({ msg: "proQuantity is requried" });
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
}

module.exports = new ProductProvider();
