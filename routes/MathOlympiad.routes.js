const express = require("express");
const router = express.Router();

const {
  ensureAuthenticated,
  addUserData,
} = require("../middleware/userMiddlewire.middlewire");
const {
  getMathOlympiad,
  postMathOlympiad,
  getMathOlympiadList,
  deleteMathOlympiad,
  paymentMathOlympiad,
  selectMathOlympiad,
  updateMathOlympiad,
  getUpdateMathOlympiad,
} = require("./../controller/MathOlympiad.controller");
router.get(
  "/mathOlympiad/register",
  ensureAuthenticated,
  addUserData,
  getMathOlympiad
);
router.post(
  "/mathOlympiad/register",
  ensureAuthenticated,
  addUserData,
  postMathOlympiad
);
router.get(
  "/mathOlympiad/list",
  ensureAuthenticated,
  addUserData,
  getMathOlympiadList
);
router.get(
  "/mathOlympiad/delete/:id",
  ensureAuthenticated,
  addUserData,
  deleteMathOlympiad
);
router.get(
  "/mathOlympiad/payment/:id",
  ensureAuthenticated,
  addUserData,
  paymentMathOlympiad
);
router.get(
  "/mathOlympiad/select/:id",
  ensureAuthenticated,
  addUserData,
  selectMathOlympiad
);
router.get(
  "/mathOlympiad/updateParticipant/:id",
  ensureAuthenticated,
  addUserData,
  updateMathOlympiad
);
router.get(
  "/mathOlympiad/update/:id",
  ensureAuthenticated,
  addUserData,
  getUpdateMathOlympiad
);

module.exports = router;
