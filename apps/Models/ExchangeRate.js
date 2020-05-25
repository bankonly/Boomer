const { Sequelize, sequelize } = require("../../app_config/database");
const Model = Sequelize.Model;
const {
  fillable,
  tableName,
} = require("../../databases/migrations/20200523015019-ExchangeRate");

class ExchangeRate extends Model {
  async fetchAll({ exclude = [] }) {
    return await ExchangeRate.findAll({ attributes: { exclude: exclude } });
  }

  async findByExchId(id, { exclude = [] }) {
    return await ExchangeRate.findOne({
      where: { id: id },
      attributes: { exclude: exclude },
    });
  }

  async findByExchName(name, { exclude = [] }) {
    return await ExchangeRate.findOne({
      where: { name: name },
      attributes: { exclude: exclude },
    });
  }

  async findByExchCountry(country, { exclude = [] }) {
    return await ExchangeRate.findOne({
      where: { country: country },
      attributes: { exclude: exclude },
    });
  }
}

ExchangeRate.init(fillable(Sequelize), {
  sequelize,
  modelName: "exchangeRate",
  tableName: tableName,
});

module.exports = {
  ExchangeRateClass: new ExchangeRate(),
  ExchangeRate,
};
