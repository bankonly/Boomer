const { ExchangeRateClass, ExchangeRate } = require("../Models/ExchangeRate");
const Res = require("../Controllers/DefaultResponseController");

class ExchangeRateProvider {
  constructor() {
    this.msg = null;
  }

  // requried params { exchName, exchSymbol, exchRate, exchCountry }
  validateCreateObj(createObj) {
    if (!createObj.exchName) this.msg = "exchName is requried";
    if (!createObj.exchSymbol) this.msg = "exchSymbol is requried";
    if (!createObj.exchRate) this.msg = "exchRate is requried";
    if (!createObj.exchCountry) this.msg = "exchCountry is not matched";
    if (this.msg == null) return Res.success({});
    return Res.badRequest({ msg: this.msg });
  }

  async createExchRate({ exchName, exchSymbol, exchRate, exchCountry }) {
    try {
      // Check Exchange Rate name is already exist or not
      const isNameExist = await ExchangeRateClass.findByExchName(exchName, {});
      if (isNameExist !== null) {
        return Res.duplicated({ msg: "Name is Already Exist" });
      }

      // Prepare data to insert
      const insertData = { exchName, exchSymbol, exchRate, exchCountry };

      const createExch = await ExchangeRate.create(insertData); // Create Exchange Rate Data
      if (!createExch) {
        return Res.badRequest({ msg: "Can not create Check Your Input" });
      }
      return Res.success({ data: createExch.dataValues });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }

  async destroyExchRate({ exchId }) {
    try {
      const isCreateData = await ExchangeRateClass.findByExchId(exchId, {});
      if (isCreateData == null) {
        return Res.notFound({ msg: "This ID is not exist" });
      }

      if (await isCreateData.destroy()) {
        return Res.success({});
      }
      return Res.error({ msg: "Can not delete" });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }

  async updateExchRate(
    { exchName, exchSymbol, exchRate, exchCountry },
    { exchId }
  ) {
    try {
      const isExchData = await ExchangeRateClass.findByExchId(exchId, {});
      if (isExchData == null) {
        return Res.duplicated({ msg: "This ID is not exist" });
      }

      // Check Exchange Rate name is already exist or not
      const isNameExist = await ExchangeRateClass.findByExchName(exchName, {});
      if (isNameExist !== null && isNameExist.exchName !== exchName) {
        return Res.duplicated({ msg: "Name is Already Exist" });
      }

      // Prepare data to insert
      const updateData = { exchName, exchSymbol, exchRate, exchCountry };

      if (!isExchData.update(updateData)) {
        return Res.badRequest({ msg: "Can not create Check Your Input" });
      }
      return Res.success({ data: isExchData.dataValues });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }

  async getExchRate({ exchId }) {
    try {
      const isCreateData = await ExchangeRateClass.findByExchId(exchId, {});
      if (isCreateData == null) {
        return Res.duplicated({ msg: "This ID is not exist" });
      }
      return Res.success({ data: isCreateData.dataValues });
    } catch (error) {
      console.log(error.message);
      return Res.somethingWrong({ msg: error.message });
    }
  }
}

module.exports = new ExchangeRateProvider();
