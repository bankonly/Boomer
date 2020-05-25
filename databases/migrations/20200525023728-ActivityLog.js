"use strict";

const tableName = "activityLog";
const fillable = (Sequelize) => {
  return {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    requestUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    requestMethod: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    requestBody: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    requestParam: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    requestIp: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    responseCode: {
      type: Sequelize.STRING(5),
      allowNull: true,
    },
    responseMessage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    responseBody: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    responseStatus: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    authorId: {
      type: Sequelize.BIGINT,
      allowNull: true,
    },
    who: {
      type: Sequelize.INTEGER(1),
      allowNull: true,
      comment:"1 = ADMIN,0 = USER"
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
  };
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, fillable(Sequelize));
  },

  down: (queryInterface, Sequelize) => queryInterface.dropTable(tableName),
  tableName: tableName,
  fillable: fillable,
};
