const CONSTANTS = {
  publicPath: "public",
  defaultImgPath: "./public/images/",
  productImgPath: "products/",
  imageTypeAccept: process.env.IMAGE_TYPE_ACCEPT.split(","),
  fetchLimit: parseInt(process.env.DB_FETCH_LIMITER),
  userRole:process.env.USER_ROLE,
  adminRole:process.env.ADMIN_ROLE,
};

module.exports = CONSTANTS;
