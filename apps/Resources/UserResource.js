const router = require("express").Router();
const UserController = require("../Controllers/UserController");

// Middlewares
const ApiAuthentication = require("../Middlewares/ApiAuthentication");

router.get("/", [ApiAuthentication], (...args) =>
  UserController(...args).get()
);
router.get("/me", [ApiAuthentication], (...args) =>
  UserController(...args).me()
);
router.post("/register", (...args) => UserController(...args).post());
router.post("/login", (...args) => UserController(...args).login());
router.get("/:id", (...args) => UserController(...args).getWithParam());
router.put("/", [ApiAuthentication], (...args) =>
  UserController(...args).update()
);
router.delete("/:id", (...args) => UserController(...args).delete());

module.exports = router;
