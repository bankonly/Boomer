const Res = require("./ResponseController");
const Controller = require("./Controller");
const ExchProvider = require("../Providers/ExchangeRateProvider");
const { ExchangeRate, ExchangeRateClass } = require("../Models/ExchangeRate");

class ExchangeRateController extends Controller {
  // @GET REQUEST
  async get() {
    try {
      const exchData = await ExchangeRateClass.fetchAll({});
      this.response({ data: exchData });
    } catch (err) {
      this.responseError({ msg: err.message });
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
      if (createData.code == 200) {
        delete createData.data.createdAt;
        delete createData.data.updatedAt;
      }
      this.response(createData);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  // @GET/{id} REQUEST
  async getWithParam() {
    try {
      const id = this.params.id;
      const exchData = await ExchProvider.getExchRate({ exchId: id });
      this.response(exchData);
    } catch (err) {
      this.responseError({ msg: err.message });
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

      const updateData = await ExchProvider.updateExchRate(body, {
        exchId: id
      });
      if (updateData.code == 200) {
        delete updateData.data.createdAt;
        delete updateData.data.updatedAt;
      }
      this.response(updateData);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }

  // @DELETE/{id} REQUEST
  async delete() {
    try {
      const id = this.params.id;
      const exchData = await ExchProvider.destroyExchRate({ exchId: id });
      this.response(exchData);
    } catch (err) {
      this.responseError({ msg: err.message });
    }
  }
}

module.exports = (...args) => new ExchangeRateController(...args);
