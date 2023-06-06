const express = require("express");

const router = express.Router();

const accountRouter = require("./accountRouter");
const reservationRouter = require("./reservationRouter");

router.use("/account", accountRouter);
router.use("/reservations", reservationRouter);

module.exports = router;
