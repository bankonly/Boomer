const { ExchangeRateClass, ExchangeRate } = require("../Models/ExchangeRate");
const Res = require("../Controllers/DefaultResponseController");

class ExchangeRateProvider {
  // requried params { name, symbol, rate, country }
  validateCreateObj(createObj) {
    var msg = null;
    if (!createObj.name) msg = "name is requried";
    else if (!createObj.symbol) msg = "symbol is requried";
    else if (!createObj.rate) msg = "rate is requried";
    else if (!createObj.country) msg = "country is not matched";
    if (msg == null) return Res.success({});
    return Res.badRequest({ msg: msg });
  }

  async createrate({ name, symbol, rate, country }) {
    try {
      // Check Exchange Rate name is already exist or not
      const isNameExist = await ExchangeRateClass.findByExchName(name, {});
      if (isNameExist !== null) {
        return Res.duplicated({ msg: "name is already exist" });
      }

      // Prepare data to insert
      const insertData = { name, symbol, rate, country };

      const createExch = await ExchangeRate.create(insertData); // Create Exchange Rate Data
      if (!createExch) {
        return Res.badRequest({ msg: "Can not create Check Your Input" });
      }
      return Res.success({ data: createExch.dataValues });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  async destroyrate({ id }) {
    try {
      const isCreateData = await ExchangeRateClass.findByExchId(id, {});
      if (isCreateData == null) {
        return Res.notFound({ msg: "This ID is not exist" });
      }

      if (await isCreateData.destroy()) {
        return Res.success({});
      }
      return Res.error({ msg: "Can not delete" });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  async updaterate({ name, symbol, rate, country }, { id }) {
    try {
      const isExchData = await ExchangeRateClass.findByExchId(id, {});
      if (isExchData == null) {
        return Res.duplicated({ msg: "This ID is not exist" });
      }

      // Check Exchange Rate name is already exist or not
      const isNameExist = await ExchangeRateClass.findByExchName(name, {});
      if (isNameExist !== null && isNameExist.name !== name) {
        return Res.duplicated({ msg: "Name is Already Exist" });
      }

      // Prepare data to insert
      const updateData = { name, symbol, rate, country };

      if (!isExchData.update(updateData)) {
        return Res.badRequest({ msg: "Can not create Check Your Input" });
      }
      return Res.success({ data: isExchData.dataValues });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }

  async getrate({ id }) {
    try {
      const isCreateData = await ExchangeRateClass.findByExchId(id, {});
      if (isCreateData == null) {
        return Res.duplicated({ msg: "This ID is not exist" });
      }
      return Res.success({ data: isCreateData.dataValues });
    } catch (error) {
      return Res.somethingWrong({ error: error });
    }
  }
}

module.exports = new ExchangeRateProvider();
