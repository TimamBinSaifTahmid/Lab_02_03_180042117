const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  addUserData,
} = require("../middleware/userMiddlewire.middlewire");
const {
  getProgrammingContest,
  postProgrammingContest,
  getProgrammingContestList,
  deleteProgrammingContest,
  paymentProgrammingContest,
  selectProgrammingContest,
} = require("./../controller/programmingContest.controller");
router.get(
  "/programmingContest/register",
  ensureAuthenticated,
  addUserData,
  getProgrammingContest
);
router.post(
  "/programmingContest/register",
  ensureAuthenticated,
  addUserData,
  postProgrammingContest
);
router.get(
  "/programmingContest/list",
  ensureAuthenticated,
  addUserData,
  getProgrammingContestList
);
router.get(
  "/programmingContest/delete/:id",
  ensureAuthenticated,
  addUserData,
  deleteProgrammingContest
);
router.get(
  "/programmingContest/payment/:id",
  ensureAuthenticated,
  addUserData,
  paymentProgrammingContest
);
router.get(
  "/programmingContest/select/:id",
  ensureAuthenticated,
  addUserData,
  selectProgrammingContest
);

module.exports = router;
