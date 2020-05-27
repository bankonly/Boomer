const Controller = require("./Controller");
const ActProvider = require("../Providers/ActivityLogProvider");
const fs = require("fs");
const CONSTANT = require("../../app_config/constants");
const { ActivityLog, ActivityLogClass } = require("../Models/ActivityLog");

class ActivityLogController extends Controller {
  async getLog() {
    try {
      var logData = null;
      if (!this.body.method) {
        return this.send.badRequest({ msg: "method is required" });
      }

      const method = this.body.method;

      if (method == "db") {
        const logData = await ActivityLog.findAll();
        logData.map((value, index) => {
          logData[index].dataValues.responseBody = JSON.parse(
            value.dataValues.responseBody
          );
        });
        this.response({ data: logData });
      } else {
        fs.readFile(CONSTANT.READ_STORAGE_PATH + "log.json", (err, data) => {
          if (err) this.somethingWrong({ error: err });
          this.response({ data: JSON.parse(data) });
        });
      }
    } catch (err) {
      this.somethingWrong({ error: err });
    }
  }
}

module.exports = (...args) => new ActivityLogController(...args);
