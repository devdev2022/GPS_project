const { getDistance } = require('../services/kakaoService');

const pricePerKm = 1600;

const calculatePrice = async (startLocation, endLocation) => {
  const distance = await getDistance(startLocation, endLocation);
  return Math.floor(distance * pricePerKm);
};

module.exports = { calculatePrice };