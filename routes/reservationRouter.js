const express = require('express');
const router = express.Router();
const { userLoginRequired, driverLoginRequired } = require('../utils/checkUser');
const { requestReservation, getReservations } = require('../controllers/userController');
const { acceptReservation } = require('../controllers/driverController');

// 유저 예약 요청
router.post('/:user_id', userLoginRequired, requestReservation);

// 예약 목록 요청
router.get('/:user_id', getReservations);

// 예약 수락 요청
router.post('/:reservation_id/:driver_id', driverLoginRequired, acceptReservation);

module.exports = router;
