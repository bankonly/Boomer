const fs = require('fs')

const CONSTANTS = {
  publicPath: "public",
  defaultImgPath: "./public/images/",
  productImgPath: "products/",
  imageTypeAccept: process.env.IMAGE_TYPE_ACCEPT.split(","),
  fetchLimit: parseInt(process.env.DB_FETCH_LIMITER),
  userRole: process.env.USER_ROLE,
  adminRole: process.env.ADMIN_ROLE,
  mailId: process.env.MAIL_ID,
  mailPassword: process.env.MAIL_PASSWORD,
  mailService: process.env.MAIL_SERVICE,
  READ_STORAGE_PATH: "./storages/",
  TYPE_WRITE: "utf-8",
  PRIVATE_KEY:fs.readFileSync('./private.key','UTF-8'),
  JWT_ALGORITHMS:process.env.JWT_ALGORITHMS
};

module.exports = CONSTANTS;
