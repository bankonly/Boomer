const router = require("express").Router();
const ProductImageController = require("../Controllers/ProductImageController");

router.get("/", (...args) => ProductImageController(...args).get());
router.post("/", (...args) => ProductImageController(...args).post());
router.get("/:id", (...args) => ProductImageController(...args).getWithParam());
router.put("/:id", (...args) => ProductImageController(...args).update());
router.delete("/:id", (...args) => ProductImageController(...args).delete());

module.exports = router;
