const userService = require('../services/userService');
const { catchAsync, raiseCustomError } = require('../utils/error');

const requestReservation = async (req, res) => {
    try {
      const userId = req.user.USER_ID;
      const rsrvDateTime = req.body.rsrvDateTime;
      const { start, end } = req.body;
  
      if (!rsrvDateTime || !start || !start.lat || !start.lng || !end || !end.lat || !end.lng) {
        res.status(400).json({ message: 'Invalid data at lat/lng' });
        return;
      } 
  
      await userService.createReservationService(rsrvDateTime, start, end, userId);
  
      res.status(200).json({ message: 'Reservation created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while processing the reservation' });
    }
  };
  



const getReservations = catchAsync(async (req, res) => {
    const userId = req.user.USER_ID;

    const user = await userService.getUserById(userId);
    if (!user) {
        raiseCustomError("User not found", 404);
    }

    const reservations = await userService.getReservationByUserService(userId);
    if (!reservations) {
        raiseCustomError("No reservations found for this user", 404);
    }

    res.status(200).json({ message: "SUCCESS", data: reservations });
});


module.exports = {requestReservation, getReservations}
