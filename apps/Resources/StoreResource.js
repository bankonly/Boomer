const router = require("express").Router();
const StoreController = require("../Controllers/StoreController");

router.get("/", (...args) => StoreController(...args).get());
router.post("/register", (...args) => StoreController(...args).post());
router.get("/:id", (...args) => StoreController(...args).getWithParam());
router.put("/:id", (...args) => StoreController(...args).update());
router.delete("/:id", (...args) => StoreController(...args).delete());

module.exports = router;
