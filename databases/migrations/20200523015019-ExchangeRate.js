"use strict";
const tableName = "exchangeRate";
const fillable = (Sequelize) => {
  return {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    symbol: {
      type: Sequelize.STRING(2),
      allowNull: false,
    },
    rate: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    country: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn("NOW"),
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  };
};

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("exchangeRate", fillable(Sequelize)),

  down: (queryInterface, Sequelize) => queryInterface.dropTable("exchangeRate"),
  fillable: (Sequelize) => fillable(Sequelize),
  tableName: tableName,
};
