const router = require("express").Router();
const ProductController = require("../Controllers/ProductController");

router.get("/", (...args) => ProductController(...args).get());
router.post("/", (...args) => ProductController(...args).post());
router.get("/:id", (...args) => ProductController(...args).getWithParam());
router.put("/:id", (...args) => ProductController(...args).update());
router.delete("/:id", (...args) => ProductController(...args).delete());

module.exports = router;
