const { Sequelize, sequelize } = require("../../app_config/database");
const Model = Sequelize.Model;

class Store extends Model {
  async fetchAll({ exclude = [] }) {
    return await Store.findAll({ attributes: { exclude: exclude } });
  }

  async findByStoreName(storeName, { exclude = [] }) {
    return await Store.findOne({
      where: { storeName: storeName },
      attributes: { exclude: exclude }
    });
  }

  async findByStoreId(storeId, { exclude = [] }) {
    return await Store.findOne({
      where: { storeId: storeId },
      attributes: { exclude: exclude }
    });
  }

  async findByStorePhoneNumber(storePhoneNumber, { exclude = [] }) {
    return await Store.findOne({
      where: { storePhoneNumber: storePhoneNumber },
      attributes: { exclude: exclude }
    });
  }

  async findByStoreVillage(storeVillage, { exclude = [] }) {
    return await Store.findOne({
      where: { storeVillage: storeVillage },
      attributes: { exclude: exclude }
    });
  }

  async findByStoreProvince(storeProvince, { exclude = [] }) {
    return await Store.findOne({
      where: { storeProvince: storeProvince },
      attributes: { exclude: exclude }
    });
  }

  async findByStoreDistrict(storeDistrict, { exclude = [] }) {
    return await Store.findOne({
      where: { storeDistrict: storeDistrict },
      attributes: { exclude: exclude }
    });
  }
}

Store.init(
  {
    storeId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    storeName: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    storeLocation: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    storeDesc: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    storeProvince: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    storeVillage: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    storePhoneNumber: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    storeDistrict: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    storeMapAddress: {
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
  { sequelize, modelName: "stores" }
);

module.exports = {
  StoreClass: new Store(),
  Store
};
