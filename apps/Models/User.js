const { Sequelize, sequelize } = require("../../app_config/database");
const {
  fillable,
  tableName,
} = require("../../databases/migrations/20200523014755-User");
const Model = Sequelize.Model;
class User extends Model {
  async findByUserId(userId) {
    return User.findByPk(userId);
  }

  removeObjecj(object) {
    delete object.role;
    delete object.password;
    delete object.createdAt;
    delete object.updatedAt;
    delete object.deletedAt;
    return object;
  }

  async findByNameOrPhoneOrEmail(nameOrPhone) {
    return User.findOne({
      where: {
        [Sequelize.Op.or]: [
          { phoneNumber: nameOrPhone },
          { firstName: nameOrPhone },
          { email: nameOrPhone },
        ],
      },
    });
  }

  async findByPhoneNumber(phoneNumber) {
    return User.findOne({
      where: { phoneNumber: phoneNumber },
    });
  }

  tokenObject(userObj) {
    return {
      userId: userObj.id,
      phoneNumber: userObj.phoneNumber,
      loginTime: userObj.loginTime,
    };
  }

  async findByEmail(email) {
    return User.findOne({
      where: { email: email },
    });
  }

  async fetchAll({
    remove = ["password", "role"],
    role = [0, 1],
    limit = 300,
  }) {
    return User.findAll({
      attributes: { exclude: remove },
      where: { role: { [Sequelize.Op.in]: role } },
      limit: limit,
    });
  }
}

User.init(fillable(Sequelize), {
  sequelize,
  modelName: "user",
  tableName: tableName,
});

module.exports = {
  UserClass: new User(),
  User,
};
