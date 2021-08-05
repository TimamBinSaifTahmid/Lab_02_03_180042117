const {
  mathOlympiad,
  mathOlympiadCreation,
} = require("../model/MathOlympiad.model");
const getMathOlympiad = (req, res) => {
  res.render("math-olympiad/register.ejs", { error: req.flash("error") });
};
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
  postgres("matholympiad")
    .insert({
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
  const { name, contact, email, institution, category, tshirt } = req.body;
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
  //res.render("math-olympiad/list.ejs");
};
const getUpdateMathOlympiad = (req, res) => {
  let error = "";
  const id = req.params.id;

  res.render("math-olympiad/update.ejs/", { id: req.flash("id") });

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
