const { mongoose } = require("../../app_config/database");
const { schema, tableName } = require("../../databases/migrations/user")(
  mongoose
);

const User = mongoose.model(tableName, schema);

class UserQueryBuilder {
  constructor() {
    this.model = User;
  }
  // find phone number
  async findByPhoneNumber({ phoneNumber, isActive = 1 }) {
    return await this.model.findOne({
      "contact.phoneNumber": phoneNumber,
      isActive: isActive
    });
  }

  // find email number
  async findByEmail({ email, isActive = 1 }) {
    return await this.model.findOne({
      "contact.email": email,
      isActive: isActive
    });
  }
}

module.exports = {
  User,
  UserQB: new UserQueryBuilder()
};
