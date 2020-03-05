const router = require("express").Router();
const UserController = require("../Controllers/UserController");

router.get("/", (...args) => UserController(...args).get());
router.post("/", (...args) => UserController(...args).post());
router.get("/:id", (...args) => UserController(...args).getWithParam());
router.put("/:id", (...args) => UserController(...args).update());
router.delete("/:id", (...args) => UserController(...args).delete());

module.exports = router;
