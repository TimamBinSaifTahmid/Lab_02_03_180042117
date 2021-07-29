require("dotenv").config();
const localStrategy = require("passport-local");
const bcrypt = require("bcrypt-nodejs");
let { user, userCreation } = require("./../model/userModel");
module.exports = (passport) => {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
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
        .select("id", "name", "email", "password")
        .from("users")
        .where("email", "=", email)
        .then((data) => {
          userCreation(
            data[0].id,
            data[0].name,
            data[0].email,
            data[0].password
          );
          console.log(user);
          const isValid = bcrypt.compareSync(password, data[0].password);
          if (isValid) {
            console.log(user);
            return done(null, user);
          } else {
            console.log("passs");
            return done(null, false, { message: "Password doesn't match" });
          }
        })
        .catch((err) => {
          console.log("asdasd");
          return done(null, false, { message: "This email is not registered" });
        });
    })
  );
  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    done(null, id);
  });
};
