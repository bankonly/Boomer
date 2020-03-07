const router = require("express").Router();
const ExchangeRateController = require("../Controllers/ExchangeRateController");

router.get("/", (...args) => ExchangeRateController(...args).get());
router.post("/", (...args) => ExchangeRateController(...args).post());
router.get("/:id", (...args) => ExchangeRateController(...args).getWithParam());
router.put("/:id", (...args) => ExchangeRateController(...args).update());
router.delete("/:id", (...args) => ExchangeRateController(...args).delete());

module.exports = router;
