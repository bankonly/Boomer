const Res = require("./ResponseController");
const Controller = require("./Controller");
const ExchProvider = require("../Providers/ExchangeRateProvider");
const { ExchangeRate, ExchangeRateClass } = require("../Models/ExchangeRate");

class ExchangeRateController extends Controller {

  async get() {
    try {
      const exchData = await ExchangeRateClass.fetchAll({});
      this.response({ data: exchData });
    } catch ({ message }) {
      this.responseError({ msg: message });
    }
  }

  async post() {
    try {
      const body = {
        exchName: this.body.exchName,
        exchSymbol: this.body.exchSymbol,
        exchRate: this.body.exchRate,
        exchCountry: this.body.exchCountry
      };

      const isValidate = ExchProvider.validateCreateObj(body);
      if (isValidate.code !== 200) return this.response(isValidate);

      const createData = await ExchProvider.createExchRate(body);
      if (createData.code == 200) {
        delete createData.data.createdAt;
        delete createData.data.updatedAt;
      }
      this.response(createData);
    } catch ({ message }) {
      this.responseError({ msg: message });
    }
  }

  async getWithParam() {
    try {
      const id = this.params.id;
      const exchData = await ExchProvider.getExchRate({ exchId: id });
      this.response(exchData);
    } catch ({ message }) {
      this.responseError({ msg: message });
    }
  }

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
      if (isValidate.code !== 200) return this.response(isValidate);

      const updateData = await ExchProvider.updateExchRate(body, {
        exchId: id
      });
      if (updateData.code == 200) {
        delete updateData.data.createdAt;
        delete updateData.data.updatedAt;
      }
      this.response(updateData);
    } catch ({ message }) {
      this.responseError({ msg: message });
    }
  }

  async delete() {
    try {
      const id = this.params.id;
      const exchData = await ExchProvider.destroyExchRate({ exchId: id });
      this.response(exchData);
    } catch ({ message }) {
      this.responseError({ msg: message });
    }
  }
}

module.exports = (...args) => new ExchangeRateController(...args);
