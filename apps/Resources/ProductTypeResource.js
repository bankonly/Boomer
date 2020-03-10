const router = require("express").Router();
const ProductTypeController = require("../Controllers/ProductTypeController");

router.get("/", (...args) => ProductTypeController(...args).get());
router.post("/", (...args) => ProductTypeController(...args).post());
router.get("/:id", (...args) => ProductTypeController(...args).getWithParam());
router.put("/:id", (...args) => ProductTypeController(...args).update());
router.delete("/:id", (...args) => ProductTypeController(...args).delete());

module.exports = router;
