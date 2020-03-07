const Res = require("./ResponseController");
const ExchProvider = require("../Providers/ExchangeRateProvider");
const { ExchangeRate, ExchangeRateClass } = require("../Models/ExchangeRate");

class ExchangeRateController {
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
    try {
      const exchData = await ExchangeRateClass.fetchAll({});
      this.send.success({ data: exchData });
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @POST REQUEST
  async post() {
    try {
      const body = {
        exchName: this.body.exchName,
        exchSymbol: this.body.exchSymbol,
        exchRate: this.body.exchRate,
        exchCountry: this.body.exchCountry
      };

      const isValidate = ExchProvider.validateCreateObj(body);
      if (isValidate.code !== 200) return this.send.badRequest(isValidate);

      const createData = await ExchProvider.createExchRate(body);

      delete createData.data.createdAt;
      delete createData.data.updatedAt;

      this.send.success(createData);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @GET/{id} REQUEST
  async getWithParam() {
    try {
      const id = this.params.id;
      const exchData = await ExchProvider.getExchRate({ exchId: id });
      this.send.success(exchData);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @PUT/{id} REQUEST
  async update() {
    const id = this.params.id;
    try {
      const body = {
        exchName: this.body.exchName,
        exchSymbol: this.body.exchSymbol,
        exchRate: this.body.exchRate,
        exchCountry: this.body.exchCountry
      };

      const isValidate = ExchProvider.validateCreateObj(body);
      if (isValidate.code !== 200) return this.send.badRequest(isValidate);

      const updateData = await ExchProvider.updateExchRate(body,{exchId:id});

      delete updateData.data.createdAt;
      delete updateData.data.updatedAt;

      this.send.success(updateData);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }

  // @DELETE/{id} REQUEST
  async delete() {
    try {
      const id = this.params.id;
      const exchData = await ExchProvider.destroyExchRate({ exchId: id });
      this.send.success(exchData);
    } catch (err) {
      this.send.error({ msg: err.message });
    }
  }
}

module.exports = (...args) => new ExchangeRateController(...args);
