const express = require("express");
const bodyPerser = require("body-parser");
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
router.get("/dashboard", getDashboard);
module.exports = router;
