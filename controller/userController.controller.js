const getRegister = (req, res) => {
  res.sendFile("register-v2.html", { root: "./views/userViews" });
};

const postRegister = (req, res) => {
  const { name, email, password, retypedPassword } = req.body;
  console.log(name, email, password);
  res.sendFile("login-v2.html", { root: "./views/userViews" });
};
const add_to_database = () => {};
const getLogin = (req, res) => {
  res.sendFile("login-v2.html", { root: "./views/userViews" });
};

const postLogin = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.sendFile("index.html", { root: "./views/userViews" });
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
