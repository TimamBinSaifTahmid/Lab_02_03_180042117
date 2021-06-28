const express = require("express");
const router = express.Router();
router.get("/login", (req, res) => {
  res.status(200).send("<h1>LOGIN PAGE</h1>");
});
router.post("/login", (req, res) => {
  res.status(200).send("<h1>LOGIN PAGE</h1>");
});
router.get("/register", (req, res) => {
  res.status(200).send("<h1>REGISTER PAGE</h1>");
});
router.post("/register", (req, res) => {
  res.status(200).send("<h1>REGISTER PAGE</h1>");
});
module.exports = router;
