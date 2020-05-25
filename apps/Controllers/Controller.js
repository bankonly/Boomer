const Res = require("./ResponseController");
const DefaultRes = require("./DefaultResponseController");

class Controller {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.params = req.params;
    this.body = req.body;
    this.send = Res(res);
    this.response = Res(res).success;
    this.responseError = Res(res).somethingWrong;
    this.success = DefaultRes.success;
    this.somethingWrong = DefaultRes.somethingWrong;
  }
}

module.exports = Controller;
