const { updateStatus } = require('../models/reservationDao');
const { createReservationDriver } = require('../models/reservationdriverDao')
const { getDistance } = require('../services/kakaoService');
const driverDao = require("../models/driverDao")

const acceptReservation = async (reservation_id, driver_id) => {
    try {
        // Update the reservation status to '예약 완료'
        await updateStatus('예약 완료', reservation_id);
        
        // Create a new record in reservation_driver table
        await createReservationDriver(reservation_id, driver_id);
    } catch (error) {
        throw error;
    }
};

const getclosereservations = async (driverLocation) => {
    const reservations = await updateStatus.findAll();

    // Calculate the distance between driver and departure location, and add it to the reservation object
    for (let i = 0; i < reservations.length; i++) {
        reservations[i].dataValues.distance = await getDistance(driverLocation, {lat: reservations[i].DEPARTURE_LAT, lon: reservations[i].DEPARTURE_LON});
    }

    // Sort the reservations by date, payment, and distance
    reservations.sort((a, b) => a.DATE.getTime() - b.DATE.getTime() || b.PAYMENT - a.PAYMENT || a.dataValues.distance - b.dataValues.distance);

    return reservations;
};

const getDriverById = async (id) => {
    const driver = await driverDao.getDriverById(id)
    return driver
  }

module.exports = { acceptReservation, getclosereservations, getDriverById };
