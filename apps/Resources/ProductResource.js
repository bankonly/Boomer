const router = require("express").Router();
const CONSTANTS = require("../../app_config/constants");

const ProductController = require("../Controllers/ProductController");
const FileProvider = require("../Providers/FileProvider"); // FileProvider to controller file 

const productImagePath = CONSTANTS.defaultImgPath + CONSTANTS.productImgPath;

router.get("/", (...args) => ProductController(...args).get());
router.post("/",FileProvider.saveMultipleImage({path:productImagePath }).any(), (...args) => ProductController(...args).post());
router.get("/resource/:id", (...args) => ProductController(...args).getWithParam());
router.put("/resource/:id", (...args) => ProductController(...args).update());
router.delete("/resource/:id", (...args) => ProductController(...args).delete());

module.exports = router;
