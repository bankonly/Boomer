const { Sequelize, sequelize } = require("../../app_config/database");
const Model = Sequelize.Model;

class ProductType extends Model {
  async fetchAll({ exclude = [] }) {
    return await ProductType.findAll({ attributes: { exclude: exclude } });
  }

  async findByProTypeId(proTypeId, { exclude = [] }) {
    return await ProductType.findOne({
      where: { proTypeId: proTypeId },
      attributes: { exclude: exclude }
    });
  }

  async findByProTypeName(proTypeName, { exclude = [] }) {
    return await ProductType.findOne({
      where: { proTypeName: proTypeName },
      attributes: { exclude: exclude }
    });
  }
}

ProductType.init(
  {
    proTypeId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    proTypeName: {
      type: Sequelize.STRING(50),
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
  { sequelize, modelName: "productTypes" }
);

module.exports = {
  ProductTypeClass: new ProductType(),
  ProductType
};
