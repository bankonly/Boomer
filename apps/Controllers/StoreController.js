const Res = require("./ResponseController");
const Controller = require("./Controller");
const { Store, StoreClass } = require("../Models/Store");
const StoreProvider = require("../Providers/StoreProvider");

class StoreController extends Controller{

  // @GET REQUEST
  async get() {
    const fetchAll = await StoreClass.fetchAll({});
    return this.response({ data: fetchAll });
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
      if (isValidate.code !== 200) return this.response(isValidate);

      const isRegister = await StoreProvider.registerStore(body);
      if (isRegister.code == 200) {
        delete isRegister.data.dataValues.createdAt;
        delete isRegister.data.dataValues.updatedAt;
      }
      return this.response(isRegister);
    } catch (error) {
      console.log(error.message);
      this.responseError({ msg: error.message });
    }
  }

  // @GET/{id} REQUEST
  async getWithParam() {
    try {
      const id = this.params.id;
      const storeData = await StoreProvider.getStore({ storeId: id });
      this.response(storeData);
    } catch (err) {
      this.responseError({ msg: err.message });
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
      if (isValidate.code !== 200) return this.response(isValidate);

      const isUpdated = await StoreProvider.updateStore(id, body);
      return this.response(isUpdated);
    } catch (error) {
      console.log(error.message);
      this.responseError({ msg: error.message });
    }
  }

  // @DELETE/{id} REQUEST
  async delete() {
    try {
      const id = this.params.id;
      const storeData = await StoreProvider.destroyStore({ storeId: id });
      this.response(storeData);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }
}

module.exports = (...args) => new StoreController(...args);
