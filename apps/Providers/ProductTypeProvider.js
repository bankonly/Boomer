const Res = require("../Controllers/DefaultResponseController");
const { ProductType, ProductTypeClass } = require("../Models/ProductType");

class ProductTypeProvider {
  async getProductType({ proTypeId }) {
    try {
      const isProType = await ProductTypeClass.findByProTypeId(proTypeId, {});
      if (isProType == null)
        return Res.notFound({ msg: "This ID is not exist" });
      return Res.success({ data: isProType.dataValues });
    } catch (error) {
      console.log(error.message);
      return Res.error({ msg: error.message });
    }
  }

  async destroyProductType({ proTypeId }) {
    try {
      const isProType = await ProductTypeClass.findByProTypeId(proTypeId, {});
      if (isProType == null)
        return Res.notFound({ msg: "This ID is not exist" });

      if (await isProType.destroy()) {
        return Res.success({});
      }
      return Res.badRequest({ msg: "Can not delete" });
    } catch (error) {
      console.log(error.message);
      return Res.error({ msg: error.message });
    }
  }

  validateCreateObj(createObj) {
    if (!createObj.proTypeName) {
      return Res.badRequest({ msg: "proTypeName is requried" });
    }
    return Res.success({});
  }

  async createProductType({ proTypeName }) {
    try {
      const isProTypeName = await ProductTypeClass.findByProTypeName(
        proTypeName,
        {}
      );
      if (isProTypeName !== null) {
        return Res.duplicated({ msg: "ProTypeName is already exist" });
      }

      const createData = await ProductType.create(...arguments);
      if (createData) {
        return Res.success({ data: createData.dataValues });
      }
      return Res.badRequest({ msg: "Can not Create" });
    } catch (error) {
      console.log(error.message);
      return Res.error({ msg: error.message });
    }
  }

  async updateProductType(proTypeId, { proTypeName }) {
    try {
      const isProType = await ProductTypeClass.findByProTypeId(proTypeId, {});
      if (isProType == null) {
        return Res.notFound({ msg: "This ID is not exist" });
      }
      const isProTypeName = await ProductTypeClass.findByProTypeName(proTypeName,{});
      if (isProTypeName !== null && isProTypeName.proTypeName !== proTypeName) {
        return Res.duplicated({ msg: "ProTypeName is already exist" });
      }
      if (isProType.update({ proTypeName })) {
        return Res.success({ data: isProType.dataValues });
      }
      return Res.badRequest({ msg: "Can not Update" });
    } catch (error) {
      console.log(error.message);
      return Res.error({ msg: error.message });
    }
  }
}

module.exports = new ProductTypeProvider();
