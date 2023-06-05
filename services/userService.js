const reservationDao = require('../models/reservationDao');
const userDao = require("../models/userDao");
const { raiseCustomError } = require('../utils/error'); 

const createReservationService = async (startAddress, startlat, startlng, endAddress, endlat, endlng, userId, payment) => {
    try {
        const { address_name: departureAddress } = startAddress;
        const { address_name: destinationAddress } = endAddress;

        await reservationDao.createReservation(departureAddress, startlat, startlng, destinationAddress, endlat, endlng, userId, payment);
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
