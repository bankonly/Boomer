"use strict";

const BcryptHelper = require("../../apps/Helpers/Bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminData = [
      {
        firstName: "bankadmin",
        loginTime: 1,
        password: await BcryptHelper.hashPassword("123123123"),
        phoneNumber: "8562052750365",
        role: 1,
        isActive:1
      },
    ];
    return queryInterface.bulkInsert("user", adminData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};
