const { Sequelize, sequelize } = require("../../app_config/database");
const Model = Sequelize.Model;

class ExchangeRate extends Model {

  async fetchAll({ exclude = [] }) {
    return await ExchangeRate.findAll({ attributes: { exclude: exclude } });
  }

  async findByExchId(exchId, { exclude = [] }) {
    return await ExchangeRate.findOne({
      where: { exchId: exchId },
      attributes: { exclude: exclude }
    });
  }

  async findByExchName(exchName, { exclude = [] }) {
    return await ExchangeRate.findOne({
      where: { exchName: exchName },
      attributes: { exclude: exclude }
    });
  }

  async findByExchCountry(exchCountry, { exclude = [] }) {
    return await ExchangeRate.findOne({
      where: { exchCountry: exchCountry },
      attributes: { exclude: exclude }
    });
  }
}

ExchangeRate.init(
  {
    exchId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    exchName: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    exchSymbol: {
      type: Sequelize.STRING(2),
      allowNull: false
    },
    exchRate: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    exchCountry: {
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
  { sequelize, modelName: "exchangeRates" }
);

module.exports = {
  ExchangeRateClass: new ExchangeRate(),
  ExchangeRate
};
