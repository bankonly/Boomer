const Controller = require("./Controller");
const { ActivityLog, ActivityLogClass } = require("../Models/ActivityLog");

class ActivityLogController extends Controller {
  async getLog() {
    try {
      const logData = await ActivityLog.findAll();
      this.response({ data: logData });
    } catch (err) {
      this.somethingWrong({ error: err });
    }
  }
}

module.exports = (...args) => new ActivityLogController(...args);
