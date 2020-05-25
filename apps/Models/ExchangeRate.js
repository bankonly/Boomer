const { Sequelize, sequelize } = require("../../app_config/database");
const Model = Sequelize.Model;

class ExchangeRate extends Model {

  async fetchAll({ exclude = [] }) {
    return await ExchangeRate.findAll({ attributes: { exclude: exclude } });
  }

  async findByExchId(id, { exclude = [] }) {
    return await ExchangeRate.findOne({
      where: { id: id },
      attributes: { exclude: exclude }
    });
  }

  async findByExchName(name, { exclude = [] }) {
    return await ExchangeRate.findOne({
      where: { name: name },
      attributes: { exclude: exclude }
    });
  }

  async findByExchCountry(country, { exclude = [] }) {
    return await ExchangeRate.findOne({
      where: { country: country },
      attributes: { exclude: exclude }
    });
  }
}

ExchangeRate.init(
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    symbol: {
      type: Sequelize.STRING(2),
      allowNull: false
    },
    rate: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn("NOW")
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn("NOW")
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
  { sequelize, modelName: "exchangeRate" }
);

module.exports = {
  ExchangeRateClass: new ExchangeRate(),
  ExchangeRate
};
