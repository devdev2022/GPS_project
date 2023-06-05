const express = require('express');
const router = express.Router();
const { acceptReservation, getReservations } = require('../controllers/driverController');
const checkUser = require("../utils/checkUser")

router.post('/reservations/:reservation_id/:driver_id', acceptReservation);
router.get('/reservations', getReservations);

module.exports = router;
