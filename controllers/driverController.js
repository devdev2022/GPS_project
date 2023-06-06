const driverService = require('../services/driverService');

const acceptReservation = async (req, res) => {
    const { reservation_id, driver_id } = req.params;
    
    try {
        await driverService.acceptReservation(reservation_id, driver_id);
        res.status(200).json({ message: 'Reservation accepted.' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An error occurred.' });
    }
};

const getReservations = async (req, res) => {
    const driverLocation = {
        latitude: req.query.latitude,
        longitude: req.query.longitude
    };

    try {
        const reservations = await driverService.getReservations(driverLocation);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
};

module.exports = { acceptReservation, getReservations };
