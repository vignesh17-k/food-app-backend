const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controller/userController");
const validateRoutes = require("../middleware/validateRoutes");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/get_user", validateRoutes, getUser);

module.exports = router;
