const express = require("express");
const bodyPerser = require("body-parser");
const {
  isloginuser,
  ensureAuthenticated,
  addUserData,
} = require("./../middleware/userMiddlewire.middlewire");
const router = express.Router();
const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getDashboard,
  getHomepage,
} = require("./../controller/userController.controller");
router.use(bodyPerser.urlencoded({ extended: false }));
router.use(bodyPerser.json());
router.get("/login", getLogin);
router.post("/login", postLogin);
router.get("/register", getRegister);
router.post("/register", postRegister);
router.get("/dashboard", ensureAuthenticated, addUserData, getDashboard);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
router.get("/", getHomepage);
module.exports = router;
