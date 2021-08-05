const { all } = require("../app");
const {
  mathOlympiad,
  mathOlympiadCreation,
} = require("../model/MathOlympiad.model");
const getProgrammingContest = (req, res) => {
  res.render("programming_Contest/register.ejs", { error: req.flash("error") });
};
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
    .insert({
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
module.exports = {
  getProgrammingContest,
  postProgrammingContest,
  getProgrammingContestList,
  deleteProgrammingContest,
  paymentProgrammingContest,
  selectProgrammingContest,
};
