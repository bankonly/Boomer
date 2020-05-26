const fs = require("fs");
const log = require("chalk");

const Res = require("../Controllers/DefaultResponseController");
const { ActivityLog, ActivityLogClass } = require("../Models/ActivityLog");
const CONSTANT = require("../../app_config/constants");

class ActivityLogProvider {
  constructor() {
    this.log = this.log.bind(this);
  }

  writeLogFile(saveData) {
    try {
      fs.writeFile(
        CONSTANT.READ_STORAGE_PATH,
        JSON.stringify(saveData),
        (err) => {
          if (err) console.log(log.red(err));
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  log(request, { code, msg, data, status,fileName = "log.txt" }, authorId = null, who = null) {
    try {
      if (request.auth) {
        authorId = request.auth.userId;
        who = request.auth.role;
      }
      var saveData = [
        {
          requestUrl: request.originalUrl,
          requestMethod: request.method,
          requestBody: JSON.stringify(request.body),
          requestParam: JSON.stringify(request.params),
          requestIp: request.ip,
          responseCode: code,
          responseMessage: msg,
          responseBody: JSON.stringify(data),
          responseStatus: status,
          authorId: authorId,
          who: who,
        },
      ];

      if (!fs.existsSync(CONSTANT.READ_STORAGE_PATH+fileName)) {
        this.writeLogFile(saveData);
      } else {
        fs.readFile(
          CONSTANT.READ_STORAGE_PATH,
          CONSTANT.TYPE_WRITE,
          (err, info) => {
            if (err) console.log(log.red(err));
            else {
              var writeData = [];
              if (info !== "") {
                writeData = JSON.parse(info);
                writeData.push(saveData);
              } else {
                writeData = saveData;
              }
              this.writeLogFile(writeData);
            }
          }
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  readFile(fileName = "log.txt"){
    
  }
}

module.exports = new ActivityLogProvider();
