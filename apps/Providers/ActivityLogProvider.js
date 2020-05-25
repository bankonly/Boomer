const Res = require("../Controllers/DefaultResponseController");
const { ActivityLog, ActivityLogClass } = require("../Models/ActivityLog");

class ActivityLogProvider {
  log(request, { code, msg, data, status }, authorId = null, who = null) {
    try {
      if (request.auth) {
        authorId = request.auth.userId;
        who = request.auth.role;
      }
      var saveData = {
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
      };
      ActivityLog.create(saveData);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new ActivityLogProvider();
