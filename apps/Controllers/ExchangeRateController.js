const Controller = require("./Controller");
const ExchProvider = require("../Providers/ExchangeRateProvider");
const { ExchangeRate, ExchangeRateClass } = require("../Models/ExchangeRate");
const CONSTANT = require("../../app_config/constants");
const { log } = require("../Providers/ActivityLogProvider");

class ExchangeRateController extends Controller {
  async get() {
    var response = this.success({});
    try {
      response = await ExchangeRateClass.fetchAll({});
    } catch (err) {
      response = this.somethingWrong({ error: err });
    }
    log(this.req, response);
    return this.response(response);
  }

  async post() {
    var response = this.success({});
    try {
      const body = {
        name: this.body.name,
        symbol: this.body.symbol,
        rate: this.body.rate,
        country: this.body.country,
      };

      const isValidate = ExchProvider.validateCreateObj(body);
      if (isValidate.code !== 200) {
        response = isValidate;
      } else {
        const createData = await ExchProvider.createrate(body);
        if (createData.code == 200) {
          delete createData.data.createdAt;
          delete createData.data.updatedAt;
        }
        response = createData;
      }
    } catch (err) {
      response = this.somethingWrong({ error: err });
    }
    log(this.req, response);
    return this.response(response);
  }

  async getWithParam() {
    var response = this.success({});
    try {
      const id = this.params.id;
      response = await ExchProvider.getrate({ id: id });
    } catch (err) {
      response = this.somethingWrong({ error: err });
    }
    log(this.req, response);
    return this.response(response);
  }

  async update() {
    var response = this.success({});
    const id = this.params.id;
    try {
      const body = {
        name: this.body.name,
        symbol: this.body.symbol,
        rate: this.body.rate,
        country: this.body.country,
      };

      const isValidate = ExchProvider.validateCreateObj(body);
      if (isValidate.code !== 200) {
        response = isValidate;
      } else {
        const updateData = await ExchProvider.updaterate(body, {
          id: id,
        });
        if (updateData.code == 200) {
          delete updateData.data.createdAt;
          delete updateData.data.updatedAt;
        }
        response = updateData;
      }
    } catch (err) {
      response = this.somethingWrong({ error: err });
    }
    log(this.req, response);
    return this.response(response);
  }

  async delete() {
    var response = this.success({});
    try {
      const id = this.params.id;
      response = await ExchProvider.destroyrate({ id: id });
    } catch (err) {
      response = this.somethingWrong({ error: err });
    }
    log(this.req, response);
    return this.response(response);
  }
}

module.exports = (...args) => new ExchangeRateController(...args);
