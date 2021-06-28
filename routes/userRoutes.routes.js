const express = require("express");
const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getDashboard,
} = require("./../controller/userController.controller");
const router = express.Router();
router.get("/login", getLogin);
router.post("/login", (req, res) => {
  res.status(200).send("<h1>LOGIN PAGE</h1>");
});
router.get("/register", getRegister);
router.post("/register", (req, res) => {
  res.status(200).send("<h1>REGISTER PAGE</h1>");
});
router.get("/dashboard", getDashboard);
module.exports = router;
