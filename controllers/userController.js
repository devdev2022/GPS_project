const kakaoService = require('../services/kakaoService');
const userService = require('../services/userService');
const { catchAsync, raiseCustomError } = require('../utils/error');

const requestReservation = async (req, res) => {
    try {
        const userId = req.user.USER_ID;

        const { start, end } = req.body;

        const startlat = start.lat;
        const startlng = start.lng;
        const endlat = end.lat;
        const endlng = end.lng;

        const { startAddress, endAddress } = await kakaoService.fetchAddress({ start, end });
        
        const payment = await kakaoService.calculatePrice({ start, end });

        await userService.createReservationService(
            startAddress,
            startlat, 
            startlng,
            endAddress,
            endlat,
            endlng,
            userId,
            payment
          );

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
