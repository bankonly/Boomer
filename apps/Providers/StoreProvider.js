const Res = require("../Controllers/DefaultResponseController");
const { Store, StoreClass } = require("../Models/Store");

class StockProvider {
  validateRegisterObj(registerObj) {
    if (!registerObj.storeName) {
      return Res.badRequest({ msg: "storeName is requried" });
    }
    if (!registerObj.storeLocation) {
      return Res.badRequest({ msg: "storeLocation is requried" });
    }
    if (!registerObj.storeProvince) {
      return Res.badRequest({ msg: "storeProvince is requried" });
    }
    if (!registerObj.storeVillage) {
      return Res.badRequest({ msg: "storeVillage is requried" });
    }
    if (!registerObj.storePhoneNumber) {
      return Res.badRequest({ msg: "storePhoneNumber is requried" });
    }
    if (!registerObj.storeDistrict) {
      return Res.badRequest({ msg: "storeDistrict is requried" });
    }
    if (!registerObj.storeMapAddress) {
      return Res.badRequest({ msg: "storeMapAddress is requried" });
    }
    
    return Res.success({});
  }
  async registerStore({
    storeName,
    storeLocation,
    storeProvince,
    storeVillage,
    storePhoneNumber,
    storeDistrict,
    storeMapAddress
  }) {
    const isStoreName = await StoreClass.findByStoreName(storeName, {});
    if (isStoreName !== null) {
      return Res.duplicated({ msg: "StoreName already in use" });
    }

    const isStorePhoneNumber = await StoreClass.findByStorePhoneNumber(
      storePhoneNumber,
      {}
    );
    if (isStorePhoneNumber !== null) {
      return Res.duplicated({ msg: "StorePhoneNumber already in use" });
    }

    const isRegister = await Store.create(...arguments);
    if (isRegister) {
      return Res.success({ data: isRegister });
    }
    return Res.badRequest({ msg: "Can not Register" });
  }

  async updateStore(
    storeId,
    {
      storeName,
      storeLocation,
      storeProvince,
      storeVillage,
      storePhoneNumber,
      storeDistrict,
      storeMapAddress
    }
  ) {
    const isStoreData = await StoreClass.findByStoreId(storeId, {});
    if (isStoreData == null) {
      return Res.notFound({ msg: "This ID is not exist" });
    }

    const isStoreName = await StoreClass.findByStoreName(storeName,{})
    if (isStoreName !== null && isStoreData.storeName !== storeName) {
      return Res.duplicated({ msg: "StoreName already in use" });
    }

    const isPhoneNumber = await StoreClass.findByStorePhoneNumber(storePhoneNumber,{})
    if (isPhoneNumber !== null && isStoreData.storePhoneNumber !== storePhoneNumber) {
      return Res.duplicated({ msg: "StorePhoneNumber already in use" });
    }

    const updateData = {
      storeName,
      storeLocation,
      storeProvince,
      storeVillage,
      storePhoneNumber,
      storeDistrict,
      storeMapAddress
    };
    if (isStoreData.update(updateData)) {
      return Res.success({ data: updateData });
    }
    return Res.badRequest({ msg: "Can not Update" });
  }

  async destroyStore({ storeId }) {
    try {
      const isStoreData = await StoreClass.findByStoreId(storeId, {});
      if (isStoreData == null) {
        return Res.notFound({ msg: "This ID is not exist" });
      }

      if (await isStoreData.destroy()) {
        return Res.success({});
      }
      return Res.error({ msg: "Can not delete" });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }

  async getStore({ storeId }) {
    try {
      const isStoreData = await StoreClass.findByStoreId(storeId, {});
      if (isStoreData == null) {
        return Res.notFound({ msg: "This ID is not exist" });
      }
      return Res.success({ data: isStoreData });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }
}

module.exports = new StockProvider();
