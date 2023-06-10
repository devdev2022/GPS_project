const express = require('express');
const router = express.Router();
const { userLoginRequired, driverLoginRequired } = require('../utils/checkUser');
const { requestReservation, getReservations } = require('../controllers/userController');
const { acceptReservation, getSearchReservations } = require('../controllers/driverController');

// 유저 예약 요청
router.post('/', userLoginRequired, requestReservation);

// 유저 예약 목록 요청
router.get('/', userLoginRequired, getReservations);

// 예약 수락 요청
router.post('/:reservation_id', driverLoginRequired, acceptReservation);

// 드라이버 예약 목록 요청 
//router.get('/', driverLoginRequired, getclosereservations);

// 드라이버 예약 검색 요청 
router.get('/search', driverLoginRequired, getSearchReservations);

module.exports = router;
