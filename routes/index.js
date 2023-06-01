const express = require("express");

const router = express.Router();

const accountRouter = require("./accountRouter");
const driveraccountRouter = require("./driverRouter");
const reservationRouter = require("./reservationRouter");

router.use("/user", accountRouter);
router.use("/driver", accountRouter);
router.use("/driveraccount", driveraccountRouter);
router.use("/reservations", reservationRouter);

module.exports = router;
