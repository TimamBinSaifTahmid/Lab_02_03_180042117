require("dotenv").config();
let flag = false;
let userName = "";
const passport = require("passport");

const getRegister = (req, res) => {
  //console.log("asdsad", req.flash("errors"));

  res.render("userViews/register-v2.ejs", { errors: req.flash("errors") });
};

const postRegister = (req, res) => {
  const { user, userCreation } = require("./../model/userModel");
  const { name, email, password, retypedPassword } = req.body;
  //Data Validation
  // console.log(name, email, password, retypedPassword);
  const errors = [];
  if (!name || !email || !password || !retypedPassword) {
    errors.push("All fields are required!");
  }
  if (password.length < 6) {
    errors.push("Password must be at least 6 characters!");
  }
  if (password !== retypedPassword) {
    errors.push("Passwords do not match!");
  }

  if (errors.length > 0) {
    req.flash("errors", errors);
    res.redirect("/register");
  } else {
    // console.log(name, email, password);
    userCreation(name, email, password);
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
        name: user.name,
        email: user.email,
        password: hash,
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        errors.push("user already exists with this email");
        console.log(err.detail);
        req.flash("errors", errors);
        res.redirect("/register");
      });
  }
};

const getLogin = (req, res) => {
  res.render("userViews/login-v2.ejs", { error: req.flash("error") });
};

const postLogin = (req, res, next) => {
  flag = true;
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};
const islogin = () => {
  return flag;
};
const getname = () => {
  return userName;
};

const getHomepage = (req, res) => {
  res.render("welcome.ejs");
};
const getDashboard = (req, res) => {
  const { user, userCreation } = require("./../model/userModel");
  res.render("index.ejs", { user: user });
  flag = false;
};
module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getDashboard,
  islogin,
  getHomepage,
};
