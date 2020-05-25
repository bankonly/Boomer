"use strict";

const tableName = "user";
const fillable = (Sequelize) => {
  return {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING(40),
      allowNull: true,
    },
    lastName: {
      type: Sequelize.STRING(40),
      allowNull: true,
    },
    role: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
      comment: "0 = normal user ,1 admin user",
    },
    avatar: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    phoneNumber: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    identityCard: {
      type: Sequelize.STRING(30),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(40),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    loginTime: {
      type: Sequelize.INTEGER,
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
    queryInterface.createTable(tableName, fillable(Sequelize)),
  down: (queryInterface, Sequelize) => queryInterface.dropTable(tableName),
  fillable: (Sequelize) => fillable(Sequelize),
  tableName: tableName,
};
