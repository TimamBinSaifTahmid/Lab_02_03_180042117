const isloginuser = (req, res, next) => {
  const {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getDashboard,
    islogin,
  } = require("./../controller/userController.controller");
  console.log(islogin());
  if (islogin()) {
    next();
  } else {
    res.redirect("/login");
    next();
  }
};
const ensureAuthenticated = (req, res, next) => {
  console.log(req.isAuthenticated());
  console.log(req.user);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};
module.exports = { isloginuser, ensureAuthenticated };
