const pricePerKm = 1600;

const calculatePrice = async (distance) => {
  return Math.floor(distance * pricePerKm);
};

module.exports = { calculatePrice };
