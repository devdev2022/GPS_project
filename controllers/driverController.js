const driverService = require('../services/driverService');

const acceptReservation = async (req, res) => {
    const reservation_id = req.params.reservation_id;
    const driver_id = req.driver.USER_ID
    
    try {
        await driverService.acceptReservation(reservation_id, driver_id);
        res.status(200).json({ message: 'Reservation accepted.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while accepting the reservation' });
    }
};


const getSortedReservations = async (req, res) => {
  const driverLocation = {
    lat: req.query.lat,
    lng: req.query.lng
  };

  const sortBy = {
    distance: req.query.sortByDistance, 
    fare: req.query.sortByFare, 
    date: req.query.sortByDate
  };

  try {
    const reservations = await driverService.getSortingReservations(driverLocation, sortBy);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while processing the reservation sorting' });
  }
};


const getSearchReservations = async (req, res) => {
    try {
      const reservations = await driverService.getSearchReservations(req, res);
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while processing the reservation searching' });
    }
};

module.exports = { acceptReservation, getSortedReservations, getSearchReservations };
