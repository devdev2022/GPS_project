const KakaoService = require('../services/kakaoService');
const userService = require('../services/userService');
const { catchAsync, raiseCustomError } = require('../utils/error');

const requestReservation = catchAsync(async (req, res) => {
    const { userId, payment, departureAddress, start, destinationAddress, end } = req.body;
    
    if (!userId || !payment || !departureAddress || !start || !start.lat || !start.lng || !destinationAddress || !end || !end.lat || !end.lng) {
        raiseCustomError("KEY_ERROR", 400);
    }

    const kakaoService = new KakaoService();
    const departureAddressResult = await kakaoService.fetchAddress(departureAddress);
    const destinationAddressResult = await kakaoService.fetchAddress(destinationAddress);

    if (!departureAddressResult || !destinationAddressResult) {
        raiseCustomError("Invalid address", 400);
    }

    // Get distance and price
    const tripInfo = await kakaoService.calculateTrip(departureAddress, destinationAddress);

    // Check if the price is the same as the user's payment
    if (tripInfo.price !== payment) {
        raiseCustomError("Payment amount does not match the calculated price", 400);
    }

    // Use reservation service to insert the data to the database
    await userService.createReservation(
      departureAddress, 
      start.lat, 
      start.lng, 
      destinationAddress, 
      end.lat, 
      end.lng, 
      userId, 
      payment
    );

    res.status(201).json({ message: "SUCCESS", tripInfo });
});

const getReservations = catchAsync(async (req, res) => {
    const { userId } = req.query;
    
    if (!userId) {
        raiseCustomError("KEY_ERROR", 400);
    }

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
