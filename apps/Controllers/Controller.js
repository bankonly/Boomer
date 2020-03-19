const Res = require("./ResponseController");

class Controller {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.params = req.params;
    this.body = req.body;
    this.send = Res(res);
    this.response = Res(res).success;
    this.responseError = Res(res).error;
  }
}

module.exports = Controller;
