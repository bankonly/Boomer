const { Sequelize, sequelize } = require("../../app_config/database");
const Model = Sequelize.Model;
const { Store } = require("./Store");

class Product extends Model {
  async findByProId(proId, { exclude = [] }) {
    return await Product.findOne({
      where: { proId: proId },
      attributes: { exclude: exclude }
    });
  }

  async findByStoreId(storeId, { exclude = [] }) {
    return await Product.findOne({
      where: { storeId: storeId },
      attributes: { exclude: exclude }
    });
  }

  async findByProTypeId(proTypeId, { exclude = [] }) {
    return await Product.findOne({
      where: { proTypeId: proTypeId },
      attributes: { exclude: exclude }
    });
  }

  async fetchhAllWithStore({ exclude = [] }) {
    return await Product.findAll({
      include: Store,
      attributes: { exclude: exclude }
    });
  }

  async findByProIdWithStore(proId, { exclude = [] }) {
    return await Product.findOne({
      include: Store,
      attributes: { exclude: exclude },
      where: { proId: proId }
    });
  }
}

Product.init(
  {
    proId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    proPrice: {
      type: Sequelize.DECIMAL(10, 2),
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
    proName: {
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
  { sequelize, modelName: "products" }
);

// STORE relationship
Product.belongsTo(Store, {
  targetKey: "storeId",
  foreignKey: "storeId"
});

module.exports = {
  ProductClass: new Product(),
  Product
};
