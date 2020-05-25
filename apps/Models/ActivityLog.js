const { Sequelize, sequelize } = require("../../app_config/database");
const Model = Sequelize.Model;
const {
  fillable,
  tableName,
} = require("../../databases/migrations/20200525023728-ActivityLog");

class ActivityLog extends Model {}

ActivityLog.init(fillable(Sequelize), {
  sequelize,
  modelName: "activityLog",
  tableName: tableName,
});

module.exports = {
  ActivityLogClass: new ActivityLog(),
  ActivityLog,
};
