const express = require("express");
const bcrypt = require("body-parser");
const app = express();
const userRouter = require("./routes/userRoutes.routes");
app.use(express.static("public"));
app.use(userRouter);
app.use((req, res) => {
  res.status(401).send("page doesn't exist");
});
module.exports = app;
