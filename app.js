const express = require("express");
const app = express();

app.post("/login", (req, res) => {
  res.status(200).send("<h1>LOGIN PAGE</h1>");
});
app.post("/register", (req, res) => {
  res.status(200).send("<h1>REGISTER PAGE</h1>");
});
module.exports = app;
