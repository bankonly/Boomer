const Res = require("./ResponseController");
const { Store, StoreClass } = require("../Models/Store");
const StoreProvider = require("../Providers/StoreProvider");

class StoreController {
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
    const fetchAll = await StoreClass.fetchAll({});
    return this.send.success({ data: fetchAll });
  }

  // @POST REQUEST
  async post() {
    try {
      const body = {
        storeName: this.body.storeName,
        storeLocation: this.body.storeLocation,
        storeProvince: this.body.storeProvince,
        storeVillage: this.body.storeVillage,
        storePhoneNumber: this.body.storePhoneNumber,
        storeDistrict: this.body.storeDistrict,
        storeMapAddress: this.body.storeMapAddress
      };
      const isValidate = StoreProvider.validateRegisterObj(body);
      if (isValidate.code !== 200) return this.send.badRequest(isValidate);

      const isRegister = await StoreProvider.registerStore(body);
      if (isRegister.code == 200) {
        delete isRegister.data.dataValues.createdAt;
        delete isRegister.data.dataValues.updatedAt;
        return this.send.success(isRegister);
      }
      return this.send.badRequest(isRegister);
    } catch (error) {
      console.log(error.message);
      this.send.error({ msg: error.message });
    }
  }

  // @GET/{id} REQUEST
  async getWithParam() {
    try {
      const id = this.params.id;
      const storeData = await StoreProvider.getStore({ storeId: id });
      this.send.success(storeData);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @PUT/{id} REQUEST
  async update() {
    const id = this.params.id;
    try {
      const body = {
        storeName: this.body.storeName,
        storeLocation: this.body.storeLocation,
        storeProvince: this.body.storeProvince,
        storeVillage: this.body.storeVillage,
        storePhoneNumber: this.body.storePhoneNumber,
        storeDistrict: this.body.storeDistrict,
        storeMapAddress: this.body.storeMapAddress
      };
      const isValidate = StoreProvider.validateRegisterObj(body);
      if (isValidate.code !== 200) return this.send.badRequest(isValidate);

      const isUpdated = await StoreProvider.updateStore(id, body);
      if (isUpdated.code == 200) {
        delete isUpdated.data.dataValues.createdAt;
        delete isUpdated.data.dataValues.updatedAt;
        return this.send.success(isUpdated);
      }
      return this.send.badRequest({});
    } catch (error) {
      console.log(error.message);
      this.send.error({ msg: error.message });
    }
  }

  // @DELETE/{id} REQUEST
  async delete() {
    try {
      const id = this.params.id;
      const storeData = await StoreProvider.destroyStore({ storeId: id });
      this.send.success(storeData);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }
}

module.exports = (...args) => new StoreController(...args);
