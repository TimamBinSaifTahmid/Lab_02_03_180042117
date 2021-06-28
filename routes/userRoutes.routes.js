const express = require("express");
const bodyPerser = require("body-parser");
const islogin = require("./../middleware/userMiddlewire.middlewire");
const router = express.Router();
const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getDashboard,
} = require("./../controller/userController.controller");
router.use(bodyPerser.urlencoded({ extended: false }));
router.use(bodyPerser.json());
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/dashboard", islogin, getDashboard);
router.get("/", islogin, getDashboard);
module.exports = router;
