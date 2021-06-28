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
module.exports = isloginuser;
