const reservationdriverDao = require("../models/reservationdriverDao");

const createReservationDriver = async (reservationId, driverId) => {
    try {
        const result = await reservationdriverDao.createReservationDriver(reservationId, driverId);
        return result;
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};

const getDriverByReservationId = async (reservationId) => {
    try {
        const result = await reservationdriverDao.getDriverByReservationId(reservationId);
        return result;
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createReservationDriver,
    getDriverByReservationId
};
