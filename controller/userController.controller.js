const getRegister = (req, res) => {
  res.sendFile("register-v2.html", { root: "./views/userViews" });
};

const postRegister = (req, res) => {
  res.send("asdas");
};

const getLogin = (req, res) => {
  res.sendFile("login-v2.html", { root: "./views/userViews" });
};

const postLogin = (req, res) => {
  res.send("dsfs");
};
const getDashboard = (req, res) => {
  res.sendFile("index.html", { root: "./views/userViews" });
};
module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getDashboard,
};
