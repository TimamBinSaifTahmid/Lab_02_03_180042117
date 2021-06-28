require("dotenv").config();
let flag = false;
let userName = "";
const getRegister = (req, res) => {
  res.sendFile("register-v2.html", { root: "./views/userViews" });
};

const postRegister = (req, res) => {
  const { name, email, password, retypedPassword } = req.body;
  if (
    name != "" &&
    email != "" &&
    password.length >= 6 &&
    password === retypedPassword
  ) {
    console.log(name, email, password);
    const bcrypt = require("bcrypt-nodejs");
    const knex = require("knex");
    const postgres = knex({
      client: process.env.client,
      connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
      },
    });
    const hash = bcrypt.hashSync(password);
    postgres("users")
      .insert({
        name: name,
        email: email,
        password: hash,
      })
      .then(() => {
        res.sendFile("login-v2.html", { root: "./views/userViews" });
      })
      .catch((err) => res.status(400).json("unable to register"));
  } else res.send("ERROR CANT REGISTER USER.");
};

const getLogin = (req, res) => {
  res.sendFile("login-v2.html", { root: "./views/userViews" });
};

const postLogin = (req, res) => {
  const { email, password } = req.body;
  const bcrypt = require("bcrypt-nodejs");
  const knex = require("knex");
  const postgres = knex({
    client: process.env.client,
    connection: {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    },
  });

  postgres
    .select("name", "email", "password")
    .from("users")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].password);
      if (isValid) {
        userName = data[0].name;
        console.log(userName);
        const alert = require("alert");
        alert(userName);
        res.sendFile("index.html", { root: "./views/userViews" });
        flag = true;
      } else res.status(400).json("wrong credential");
    })
    .catch((err) => res.status(400).json("wrong credential"));
};
const islogin = () => {
  return flag;
};
const getname = () => {
  return userName;
};
const getDashboard = (req, res) => {
  res.sendFile("index.html", { root: "./views/userViews" });
  flag = false;
};
module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getDashboard,
  islogin,
};
