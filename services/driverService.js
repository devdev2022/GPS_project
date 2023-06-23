const { updateStatus, getUncompletedReservations } = require('../models/reservationDao');
const { createReservationDriver, getFindReservations } = require('../models/reservationdriverDao')
const { calculateDistance } = require('../services/kakaoService');
const driverDao = require("../models/driverDao")

const acceptReservation = async (reservation_id, driver_id) => {
    try {
        await updateStatus('예약 완료', reservation_id);
        await createReservationDriver(reservation_id, driver_id);
    } catch (error) {
        throw error;
    }
};

const getSortingReservations = async (driverLocation, sortBy, order) => {
    let reservations = await getUncompletedReservations();

    const now = new Date();
    reservations = reservations.filter(reservation => new Date(reservation.RESERVATION_DATE_TIME) >= now);
    
    if(reservations.length===0) {
        return "There are no reservations for the current time frame"
    }

    for (let i = 0; i < reservations.length; i++) {
        const reservationLocation = {
            lat: reservations[i].departure_lat, 
            lng: reservations[i].departure_lon
        };
        reservations[i].distance = calculateDistance({start: driverLocation, end: reservationLocation});
    }

    const sortFns = [];

    if(sortBy.date) {
        const sortFn = (a, b) => {
            const timeA = new Date(a.RESERVATION_DATE_TIME).getTime();
            const timeB = new Date(b.RESERVATION_DATE_TIME).getTime();
            return sortBy.date === 'asc' ? timeA - timeB : timeB - timeA;
        };
        sortFns.push(sortFn);
        }

    if(sortBy.fare) {
    const sortFn = (a, b) => sortBy.fare === 'asc' ? a.payment - b.payment : b.payment - a.payment;
    sortFns.push(sortFn);
    }

    if(sortBy.distance) {
    const sortFn = (a, b) => sortBy.distance === 'asc' ? a.distance - b.distance : b.distance - a.distance;
    sortFns.push(sortFn);
    }

    reservations.sort((a, b) => {
        for(let i = 0; i < sortFns.length; i++) {
            const result = sortFns[i](a, b);
            if(result !== 0) return result;
        }
        return 0;
    });
    return reservations;
};


const getSearchReservations = async (req, res) => {
    try {
      const reservations = await getFindReservations(req, res);
      return reservations;
    } catch (error) {      
      throw error;
    }
};

const getDriverById = async (id) => {
    const driver = await driverDao.getDriverById(id)
    return driver
  }

module.exports = { acceptReservation, getSortingReservations, getSearchReservations, getDriverById };
