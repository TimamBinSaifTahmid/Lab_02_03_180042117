const {
  mathOlympiad,
  mathOlympiadCreation,
} = require("../model/MathOlympiad.model");
var crypto = require("crypto");
const random = require("random");
CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;
REDIRECT_URI = process.env.REDIRECT_URI;
REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const getMathOlympiad = (req, res) => {
  res.render("math-olympiad/register.ejs", { error: req.flash("error") });
};

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const verificationCode = random.int((min = 1111111), (max = 9999999));
console.log(verificationCode);
async function sendMail(emailAddress, verficationCode, personName) {
  try {
    vfCode = verficationCode.toString();
    console.log(verficationCode);
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "timambinsaif462@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "MATH OLYMPIAD 2021<timambinsaif462@gmail.com>",
      to: emailAddress,
      subject: "Identidacation Code",
      text: vfCode,
      html:
        " <b>Hi " +
        personName +
        "!<br> <p> You are registering in math olympiad 2021.<h4>Your unique identification code<b> is :</h4><h1><t>" +
        vfCode +
        "</h1> <t><br><p>Please store this code for future use.</p><br><p>This is an automated email. Please do not reply to this email</p></b.",
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
const postMathOlympiad = (req, res) => {
  const { name, contact, email, institution, category, tshirt } = req.body;
  console.log(name, contact, email, institution, tshirt, category);
  console.log(institution);
  let registrationFee = 0;
  if (category == "School") {
    console.log(institution, "School");
    registrationFee = 250;
  } else if (category == "College") {
    registrationFee = 400;
  } else {
    registrationFee = 500;
  }

  const total = registrationFee;
  console.log(total);
  const paid = 0;
  const selected = false;
  let error = "";
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
  // knex("users").count("active");
  postgres("matholympiad")
    .select("*")
    .then((obj) => {
      var uniqueid = (obj[obj.length - 1].id + 1).toString();
      var hashForm = crypto.createHash("md5").update(uniqueid).digest("hex");
      console.log(hashForm);
      postgres("matholympiad")
        .insert({
          uniqueid: hashForm,
          name: name,
          category: category,
          contact: contact,
          email: email,
          institution: institution,
          total: total,
          paid: paid,
          selected: selected,
          tshirt: tshirt,
        })
        .then(() => {
          postgres("matholympiad")
            .where({
              contact: contact,
              email: email,
            })
            .select("id")
            .then((id1) => {
              console.log(id1[0].id);
              let randomNumber = 100000000 + id1[0];
              sendMail(email, hashForm, name);
              mathOlympiadCreation(
                id1[0].id,
                name,
                category,
                contact,
                email,
                institution,
                total,
                paid,
                selected,
                tshirt
              );
              error = "participant has registered successfully!";
              req.flash("error", error);
              res.redirect("/mathOlympiad/register");
            })
            .catch((err) => {
              error = "Database error!";
              req.flash("error", error);
              res.redirect("/mathOlympiad/register");
              console.log(err);
            });
        })
        .catch((err) => {
          error =
            "Participant with this name and contact information already exists!";
          console.log(err);
          req.flash("error", error);
          res.redirect("/mathOlympiad/register");
        });
    })
    .catch(() => {
      var uniqueid = "1";
      var hashForm = crypto.createHash("md5").update(uniqueid).digest("hex");
      console.log(hashForm);
      postgres("matholympiad")
        .insert({
          uniqueid: hashForm,
          name: name,
          category: category,
          contact: contact,
          email: email,
          institution: institution,
          total: total,
          paid: paid,
          selected: selected,
          tshirt: tshirt,
        })
        .then(() => {
          postgres("matholympiad")
            .where({
              contact: contact,
              email: email,
            })
            .select("id")
            .then((id1) => {
              console.log(id1[0].id);
              let randomNumber = 100000000 + id1[0];
              sendMail(email, verificationCode, name);
              mathOlympiadCreation(
                id1[0].id,
                name,
                category,
                contact,
                email,
                institution,
                total,
                paid,
                selected,
                tshirt
              );
              error = "participant has registered successfully!";
              req.flash("error", error);
              res.redirect("/mathOlympiad/register");
            })
            .catch((err) => {
              error = "Database error!";
              req.flash("error", error);
              res.redirect("/mathOlympiad/register");
              console.log(err);
            });
        })
        .catch((err) => {
          error =
            "Participant with this name and contact information already exists!";
          console.log(err);
          req.flash("error", error);
          res.redirect("/mathOlympiad/register");
        });
    });
};
const getMathOlympiadList = (req, res) => {
  const knex = require("knex");
  let allParticipant = [];
  const postgres = knex({
    client: process.env.client,
    connection: {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    },
  });
  postgres("matholympiad")
    .select("*")
    .then((data) => {
      allParticipant = data;
      if (allParticipant[0].email == undefined) {
        error = "Can't find any participant";
        console.log(err);
        req.flash("error", error);
        res.render("math-olympiad/list.ejs", {
          error: req.flash("error"),
          participants: allParticipant,
        });
      } else {
        console.log(allParticipant[0]);
        error = "participant list retrived successfully!";
        console.log(error);
        res.render("math-olympiad/list.ejs", {
          error: req.flash("error"),
          participants: allParticipant,
        });
      }
    })
    .catch((err) => {
      error = "Can't find any participant";
      console.log(err);
      req.flash("error", error);
      res.render("math-olympiad/list.ejs", {
        error: req.flash("error"),
        participants: allParticipant,
      });
    });
};
const deleteMathOlympiad = (req, res) => {
  const id = req.params.id;
  const knex = require("knex");
  let error = "";
  let allParticipant = [];
  const postgres = knex({
    client: process.env.client,
    connection: {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    },
  });
  postgres("matholympiad")
    .where("id", id)
    .del()
    .then(() => {
      error = "Data is deleted Successfully";
      req.flash("error", error);
      res.redirect("/mathOlympiad/list");
    })
    .catch((err) => {
      error = "Failed to delete a perticipant";
      req.flash("error", error);
      res.redirect("/mathOlympiad/list");
    });
  console.log(id);
  //res.render("math-olympiad/list.ejs");
};
const paymentMathOlympiad = (req, res) => {
  const id = req.params.id;
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
  postgres("matholympiad")
    .select("*")
    .where("id", "=", id)
    .then((participant) => {
      postgres("matholympiad")
        .where("id", "=", id)
        .update({
          paid: participant[0].total,
        })
        .then(() => {
          error = "Successfully completed payment process!";
          req.flash("error", error);
          res.redirect("/mathOlympiad/list");
        })
        .catch(() => {
          error = "Failed to complete payment process!";
          req.flash("error", error);
          res.redirect("/mathOlympiad/list");
        });
    })
    .catch(() => {
      error = "Failed to complete payment process!";
      req.flash("error", error);
      res.redirect("/mathOlympiad/list");
    });

  console.log(id);
  //res.render("math-olympiad/list.ejs");
};
const selectMathOlympiad = (req, res) => {
  const id = req.params.id;
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
  postgres("matholympiad")
    .where("id", "=", id)
    .update({
      selected: true,
    })
    .then(() => {
      error = "Successfully completed selection process!";
      req.flash("error", error);
      res.redirect("/mathOlympiad/list");
    })
    .catch(() => {
      error = "Can't completed selection process!";
      req.flash("error", error);
      res.redirect("/mathOlympiad/list");
    });
  console.log(id);
  //res.render("math-olympiad/list.ejs");
};

const updateMathOlympiad = (req, res) => {
  const id = req.params.id;
  console.log("sad");
  console.log(id, "in update");
  const { name, contact, email, institution, category, tshirt } = req.body;
  console.log(name, contact, email, institution, tshirt, category);
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
  postgres("matholympiad")
    .where("id", "=", id)
    .update({
      name: name,
      category: category,
      contact: contact,
      email: email,
      institution: institution,
      tshirt: tshirt,
    })
    .then(() => {
      error = "Data is Updated Successfully";
      req.flash("error", error);
      res.redirect("/mathOlympiad/list");
    })
    .catch((err) => {
      error = "Failed to Update a perticipant";
      req.flash("error", error);
      res.redirect("/mathOlympiad/list");
    });
  console.log(id);
  //res.render("/mathOlympiad/update");
};
const getUpdateMathOlympiad = (req, res) => {
  let error = "";
  const id = req.params.id;
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
  postgres("matholympiad")
    .select("*")
    .where("id", "=", id)
    .then((data) => {
      console.log(
        data[0].name,
        data[0].contact,
        data[0].email,
        data[0].institution,
        data[0].tshirt,
        data[0].category
      );

      res.render("math-olympiad/update.ejs", {
        ids: id,
        participant: data[0],
      });
    })
    .catch(() => {
      console.log(id, "get called");
      res.render("math-olympiad/update.ejs", {
        ids: id,
        participant: participant,
      });
    });

  //res.render("math-olympiad/list.ejs");
};
module.exports = {
  getMathOlympiad,
  postMathOlympiad,
  getMathOlympiadList,
  deleteMathOlympiad,
  paymentMathOlympiad,
  selectMathOlympiad,
  updateMathOlympiad,
  getUpdateMathOlympiad,
};
