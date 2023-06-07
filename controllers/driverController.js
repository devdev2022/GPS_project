const driverService = require('../services/driverService');

const acceptReservation = async (req, res) => {
    const { reservation_id, driver_id } = req.params;
    
    try {
        await driverService.acceptReservation(reservation_id, driver_id);
        res.status(200).json({ message: 'Reservation accepted.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
};

/*
const getclosereservations = async (req, res) => {
    const driverId = req.params.driver_id;
    const driverLocation = {
        latitude: req.query.latitude,
        longitude: req.query.longitude
    };

    try {
        const driver = await driverService.getDriverById(driverId);
        if (!driver) {
            return res.status(404).json({ message: 'USER_DOES_NOT_EXIST' }); 
        }
        
        const reservations = await driverService.getclosereservations(driverLocation);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
};
*/

const getsearchreservations = async (req, res) => {
    try {
      const reservations = await driverService.getsearchreservations(req, res);
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.' });
    }
};

module.exports = { acceptReservation, getsearchreservations };
