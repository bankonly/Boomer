const fs = require("fs");
const log = require("chalk");

const Res = require("../Controllers/DefaultResponseController");
const CONSTANT = require("../../app_config/constants");
const { ActivityLog } = require("../Models/ActivityLog");

class ActivityLogProvider {
  constructor() {
    this.log = this.log.bind(this);
  }

  writeLogFile({ arrayData, fileName = "log.json" }) {
    try {
      fs.writeFile(
        CONSTANT.READ_STORAGE_PATH + fileName,
        JSON.stringify(arrayData),
        (err) => {
          if (err) console.log(log.red(err));
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  log(
    request,
    { code, msg, data, status },
    fileName = "log.json",
    method = "file",
    authorId = null,
    who = null
  ) {
    try {
      if (request.auth) {
        authorId = request.auth.userId;
        who = request.auth.role;
      }
      var saveData = [
        {
          requestUrl: request.originalUrl,
          requestMethod: request.method,
          requestBody:
            method == "file" ? request.body : JSON.stringify(request.body),
          requestParam:
            method == "file" ? request.params : JSON.stringify(request.params),
          requestIp: request.ip,
          responseCode: code,
          responseMessage: msg,
          responseBody: method == "file" ? data : JSON.stringify(data),
          responseStatus: status,
          authorId: authorId,
          who: who,
        },
      ];

      if (method == "db") {
        ActivityLog.create(saveData[0]);
        return;
      }
      const readPath = CONSTANT.READ_STORAGE_PATH + fileName;
      if (!fs.existsSync(readPath)) {
        this.writeLogFile({ arrayData: saveData });
      } else {
        fs.readFile(readPath, CONSTANT.TYPE_WRITE, (err, info) => {
          if (err) console.log(log.red(err));
          else {
            var writeData = null;
            if (info !== "") {
              writeData = JSON.parse(info);
              writeData.push(saveData[0]);
            } else {
              writeData = saveData;
            }
            this.writeLogFile({ arrayData: writeData });
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async getLog({ fileName, method }) {
    try {
      var logData = null;
      if (!method) {
        return Res.badRequest({ msg: "method is requried" });
      }
      if (method == "db") {
        const logData = await ActivityLog.findAll();
        logData.map((value, index) => {
          logData[index].dataValues.responseBody = JSON.parse(
            value.dataValues.responseBody
          );
        });
        return Res.success({ data: logData });
      } else {
        return fs.readFile(
          CONSTANT.READ_STORAGE_PATH + "log.json",
          (err, data) => {
            if (err) return Res.somethingWrong({ error: err });
            return Res.success({ data: JSON.parse(data) });
          }
        );
      }
    } catch (err) {
      return Res.somethingWrong({ error: err });
    }
  }
}

module.exports = new ActivityLogProvider();
