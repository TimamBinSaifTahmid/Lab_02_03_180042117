const { all } = require("../app");
const {
  mathOlympiad,
  mathOlympiadCreation,
} = require("../model/MathOlympiad.model");
var crypto = require("crypto");
CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;
REDIRECT_URI = process.env.REDIRECT_URI;
REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const getProgrammingContest = (req, res) => {
  res.render("programming_Contest/register.ejs", { error: req.flash("error") });
};

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(emailAddress, verficationCode, teamName, personName) {
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
      from: "Programming Contest 2021<timambinsaif462@gmail.com>",
      to: emailAddress,
      subject: "Identification Code",
      text: vfCode,
      html:
        " <b>Hi " +
        personName +
        "!<br> <p> You are registering in Programming Contest 2021 under team:" +
        teamName +
        ".<h4>Your team's unique identification code<b> is :</h4><h1><t>" +
        vfCode +
        "</h1> <t><br><p>Please Store this code for future use.</p><br><p>This is an automated email. Please do not reply to this email</p></b.",
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
const postProgrammingContest = (req, res) => {
  let error = "";
  const {
    teamName,
    institutionName,
    category,
    coachName,
    coachContact,
    coachEmail,
    coachTshirt,
    teamLeaderName,
    teamLeaderContact,
    teamLeaderEmail,
    teamLeaderTshirt,
    firstMemberName,
    firstMemberContact,
    firstMemberEmail,
    firstMemberTshirt,
    secondMemberName,
    secondMemberContact,
    secondMemberEmail,
    secondMemberTshirt,
  } = req.body;

  console.log(
    teamName,
    institutionName,
    category,
    coachName,
    coachContact,
    coachEmail,
    coachTshirt,
    teamLeaderName,
    teamLeaderContact,
    teamLeaderEmail,
    teamLeaderTshirt,
    firstMemberName,
    firstMemberContact,
    firstMemberEmail,
    firstMemberTshirt,
    secondMemberName,
    secondMemberContact,
    secondMemberEmail,
    secondMemberTshirt
  );

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
  postgres("programmingcontest")
    .select("*")
    .then((obj) => {
      var uniqueid = (obj[obj.length - 1].id + 1).toString();
      var hashForm = crypto.createHash("md5").update(uniqueid).digest("hex");
      console.log(hashForm);
      postgres("programmingcontest")
        .insert({
          uniqueid: hashForm,
          teamname: teamName,
          institutionname: institutionName,
          category: category,
          coachname: coachName,
          coachcontact: coachContact,
          coachemail: coachEmail,
          coachtshirt: coachTshirt,
          teamleadername: teamLeaderName,
          teamleadercontact: teamLeaderContact,
          teamleaderemail: teamLeaderEmail,
          teamleadertshirt: teamLeaderTshirt,
          firstmembername: firstMemberName,
          firstmembercontact: firstMemberContact,
          firstmemberemail: firstMemberEmail,
          firstmembertshirt: firstMemberTshirt,
          secondmembername: secondMemberName,
          secondmembercontact: secondMemberContact,
          secondmemberemail: secondMemberEmail,
          secondmembertshirt: secondMemberTshirt,
          total: total,
          paid: paid,
          selected: selected,
        })
        .then(() => {
          sendMail(teamLeaderEmail, hashForm, teamName, teamLeaderName);
          sendMail(firstMemberEmail, hashForm, teamName, firstMemberName);
          sendMail(secondMemberEmail, hashForm, teamName, secondMemberName);
          error = "Registration Process Successfull!";
          req.flash("error", error);
          res.redirect("/programmingContest/register");
        })
        .catch((err) => {
          error = "Can't register participant!";
          console.log(err);
          req.flash("error", error);
          res.redirect("/programmingContest/register");
        });
    })
    .catch(() => {
      var uniqueid = "1";
      var hashForm = crypto.createHash("md5").update(uniqueid).digest("hex");
      console.log(hashForm);
      postgres("programmingcontest")
        .insert({
          uniqueid: hashForm,
          teamname: teamName,
          institutionname: institutionName,
          category: category,
          coachname: coachName,
          coachcontact: coachContact,
          coachemail: coachEmail,
          coachtshirt: coachTshirt,
          teamleadername: teamLeaderName,
          teamleadercontact: teamLeaderContact,
          teamleaderemail: teamLeaderEmail,
          teamleadertshirt: teamLeaderTshirt,
          firstmembername: firstMemberName,
          firstmembercontact: firstMemberContact,
          firstmemberemail: firstMemberEmail,
          firstmembertshirt: firstMemberTshirt,
          secondmembername: secondMemberName,
          secondmembercontact: secondMemberContact,
          secondmemberemail: secondMemberEmail,
          secondmembertshirt: secondMemberTshirt,
          total: total,
          paid: paid,
          selected: selected,
        })
        .then(() => {
          sendMail(email, hashForm, teamName, teamLeaderName);
          sendMail(email, hashForm, teamName, firstMemberName);
          sendMail(email, hashForm, teamName, secondMemberName);
          error = "Registration Process Successfull!";
          req.flash("error", error);
          res.redirect("/programmingContest/register");
        })
        .catch((err) => {
          error = "Can't register participant!";
          console.log(err);
          req.flash("error", error);
          res.redirect("/programmingContest/register");
        });
    });
};
const getProgrammingContestList = (req, res) => {
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

  postgres("programmingcontest")
    .select("*")
    .then((data) => {
      allParticipant = data;
      if (allParticipant[0].teamname == undefined) {
        error = "Can't find any participant";
        console.log(error);
        req.flash("error", error);
        res.render("programming_Contest/list.ejs", {
          error: req.flash("error"),
          participants: allParticipant,
        });
      } else {
        console.log(allParticipant[0]);
        error = "participant list retrived successfully!";
        console.log(error);
        res.render("programming_Contest/list.ejs", {
          error: req.flash("error"),
          participants: allParticipant,
        });
      }
    })
    .catch((err) => {
      error = "Can't find any participant";
      console.log(err);
      req.flash("error", error);
      res.render("programming_Contest/list.ejs", {
        error: req.flash("error"),
        participants: allParticipant,
      });
    });
  //   allParticipant = [];
  //   res.render("programming_Contest/list.ejs", {
  //     error: req.flash("error"),
  //     participants: allParticipant,
  //   });
  //   res.render("programming_Contest/list.ejs");
};
const deleteProgrammingContest = (req, res) => {
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
  postgres("programmingcontest")
    .where("id", id)
    .del()
    .then(() => {
      error = "Data is deleted Successfully";
      req.flash("error", error);
      res.redirect("/programmingContest/list");
    })
    .catch((err) => {
      error = "Failed to delete a perticipant";
      req.flash("error", error);
      res.redirect("/programmingContest/list");
    });
  console.log(id);
  //res.render("math-olympiad/list.ejs");
};
const paymentProgrammingContest = (req, res) => {
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
  postgres("programmingcontest")
    .select("*")
    .where("id", "=", id)
    .then((participant) => {
      postgres("programmingcontest")
        .where("id", "=", id)
        .update({
          paid: participant[0].total,
        })
        .then(() => {
          error = "Successfully completed payment process!";
          req.flash("error", error);
          res.redirect("/programmingContest/list");
        })
        .catch(() => {
          error = "Failed to complete payment process!";
          req.flash("error", error);
          res.redirect("/programmingContest/list");
        });
    })
    .catch(() => {
      error = "Failed to complete payment process!";
      req.flash("error", error);
      res.redirect("/programmingContest/list");
    });

  console.log(id);
  //res.render("math-olympiad/list.ejs");
};
const selectProgrammingContest = (req, res) => {
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
  postgres("programmingcontest")
    .where("id", "=", id)
    .update({
      selected: true,
    })
    .then(() => {
      error = "Successfully completed selection process!";
      req.flash("error", error);
      res.redirect("/programmingContest/list");
    })
    .catch(() => {
      error = "Can't completed selection process!";
      req.flash("error", error);
      res.redirect("/programmingContest/list");
    });
  console.log(id);
  //res.render("math-olympiad/list.ejs");
};
const updateProgrammingContest = (req, res) => {
  const id = req.params.id;
  console.log("sad");
  console.log(id, "in update");
  let {
    teamName,
    institutionName,
    category,
    coachName,
    coachContact,
    coachEmail,
    coachTshirt,
    teamLeaderName,
    teamLeaderContact,
    teamLeaderEmail,
    teamLeaderTshirt,
    firstMemberName,
    firstMemberContact,
    firstMemberEmail,
    firstMemberTshirt,
    secondMemberName,
    secondMemberContact,
    secondMemberEmail,
    secondMemberTshirt,
  } = req.body;
  console.log(
    teamName,
    institutionName,
    category,
    coachName,
    coachContact,
    coachEmail,
    coachTshirt,
    teamLeaderName,
    teamLeaderContact,
    teamLeaderEmail,
    teamLeaderTshirt,
    firstMemberName,
    firstMemberContact,
    firstMemberEmail,
    firstMemberTshirt,
    secondMemberName,
    secondMemberContact,
    secondMemberEmail,
    secondMemberTshirt
  );
  // console.log(name, contact, email, institution, tshirt, category);
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
  postgres("programmingcontest")
    .where("id", "=", id)
    .update({
      teamname: teamName,
      institutionname: institutionName,
      category: category,
      coachname: coachName,
      coachcontact: coachContact,
      coachemail: coachEmail,
      coachtshirt: coachTshirt,
      teamleadername: teamLeaderName,
      teamleadercontact: teamLeaderContact,
      teamleaderemail: teamLeaderEmail,
      teamleadertshirt: teamLeaderTshirt,
      firstmembername: firstMemberName,
      firstmembercontact: firstMemberContact,
      firstmemberemail: firstMemberEmail,
      firstmembertshirt: firstMemberTshirt,
      secondmembername: secondMemberName,
      secondmembercontact: secondMemberContact,
      secondmemberemail: secondMemberEmail,
      secondmembertshirt: secondMemberTshirt,
    })
    .then(() => {
      error = "Data is Updated Successfully";
      req.flash("error", error);
      res.redirect("/programmingContest/list");
    })
    .catch((err) => {
      error = "Failed to Update a perticipant";
      req.flash("error", error);
      res.redirect("/programmingContest/list");
    });
  console.log(id);
  //res.render("/mathOlympiad/update");
};
const getUpdateProgrammingContest = (req, res) => {
  let error = "";
  const id = req.params.id;
  console.log(id);
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
  postgres("programmingcontest")
    .select("*")
    .where("id", "=", id)
    .then((data) => {
      console.log(
        data[0].teamname,
        data[0].institutionname,
        data[0].category,
        data[0].coachname,
        data[0].coachcontact,
        data[0].coachemail,
        data[0].coachtshirt,
        data[0].teamleadername,
        data[0].teamleadercontact,
        data[0].teamleaderemail,
        data[0].teamleadertshirt,
        data[0].firstmembername,
        data[0].firstmembercontact,
        data[0].firstmemberemail,
        data[0].firstmembertshirt,
        data[0].secondmembername,
        data[0].secondmembercontact,
        data[0].secondmemberemail,
        data[0].secondmembertshirt,
        data[0].total,
        data[0].paid,
        data[0].selected
      );

      res.render("programming_Contest/update.ejs", {
        ids: id,
        participant: data[0],
      });
    })
    .catch(() => {
      console.log(id, "get called");
      res.render("programming_Contest/update.ejs", {
        ids: id,
        participant: participant,
      });
    });

  //res.render("math-olympiad/list.ejs");
};
module.exports = {
  getProgrammingContest,
  postProgrammingContest,
  getProgrammingContestList,
  deleteProgrammingContest,
  paymentProgrammingContest,
  selectProgrammingContest,
  updateProgrammingContest,
  getUpdateProgrammingContest,
};
