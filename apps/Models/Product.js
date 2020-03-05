const { Sequelize, sequelize } = require("../../app_config/database");
const Model = Sequelize.Model;

class Product extends Model {}

Product.init(
  {
    proId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    proPrice: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false
    },
    proTypeId: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    proQuantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    proDesc: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    storeId: {
      type: Sequelize.BIGINT,
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
  { sequelize, modelName: "products" }
);

module.exports = {
  ProductClass: new Product(),
  Product
};
