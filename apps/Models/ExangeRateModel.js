const { Sequelize, sequelize } = require("../../app_config/database");
const Model = Sequelize.Model;

class ExangeRateModel extends Model {}

ExangeRateModel.init(
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
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
      allowNull: true,
      defaultValue: Sequelize.fn("NOW")
    }
  },
  { sequelize, modelName: "exchangeRates" }
);

module.exports = {
  ExangeRateModelClass: new ExangeRateModel(),
  ExangeRateModel
};
