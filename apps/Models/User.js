const { Sequelize, sequelize } = require("../../app_config/database");
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

  async findByPhoneNumber(phoneNumber) {
    return User.findOne({
      where: { phoneNumber: phoneNumber }
    });
  }

  tokenObject(userObj) {
    return {
      userId: userObj.userId,
      phoneNumber: userObj.phoneNumber
    };
  }

  async findByEmail(email) {
    return User.findOne({
      where: { email: email }
    });
  }

  async fetchAll({ remove = ["password", "role"] }) {
    return User.findAll({ attributes: { exclude: remove } });
  }
}

User.init(
  {
    userId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING(40),
      allowNull: true
    },
    lastName: {
      type: Sequelize.STRING(40),
      allowNull: true
    },
    role: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
      comment: "0 = normal user ,1 admin user"
    },
    avatar: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    phoneNumber: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    identityCard: {
      type: Sequelize.STRING(30),
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(40),
      allowNull: true
    },
    password: {
      type: Sequelize.STRING(100),
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
  { sequelize, modelName: "users" }
);

module.exports = {
  UserClass: new User(),
  User
};
