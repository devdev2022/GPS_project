const reservationDao = require('../models/reservationDao');
const userDao = require("../models/userDao");
const kakaoService = require("./kakaoService");
const { raiseCustomError } = require('../utils/error'); 

const createReservationService = async (rsrvDateTime, start, end, userId) => {
    try {
      const { startAddress, endAddress } = await kakaoService.fetchAddress({ start, end });
      const payment = await kakaoService.calculatePrice({ start, end });
  
      await reservationDao.createReservation(
        rsrvDateTime,
        startAddress,
        start.lat,
        start.lng,
        endAddress,
        end.lat,
        end.lng,
        userId,
        payment
      );
    } catch (error) {
      raiseCustomError(error.message, error.statusCode);
    }
  };
  

const getReservationByUserService = async (userId) => {
    try {
        const result = await reservationDao.getReservationByuserId(userId);
        return result;
    } catch (error) {
        raiseCustomError(error.message, error.statusCode);
    }
};

const getUserById = async (id) => {
    const user = await userDao.getUserById(id)
    return user
  }

module.exports = { 
    createReservationService, 
    getReservationByUserService,
    getUserById
};
