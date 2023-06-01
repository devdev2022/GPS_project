const reservationDao = require('../models/reservationDao');
const userDao = require("../models/userDao");
const { raiseCustomError } = require('../utils/error'); 

const createReservationService = async (departureAddress, departureLat, departureLon, destinationAddress, destinationLat, destinationLon, userId, payment) => {
    try {
        await reservationDao.createReservation(departureAddress, departureLat, departureLon, destinationAddress, destinationLat, destinationLon, userId, payment);
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
