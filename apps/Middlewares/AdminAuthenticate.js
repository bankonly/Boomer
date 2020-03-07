const Res = require("../Controllers/ResponseController");

const AdminAuthenticate = (req, res, next) => {
  const send = Res(res);
  return next();
};

module.exports = AdminAuthenticate;
