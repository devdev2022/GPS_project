const fetch = require('node-fetch');
const priceCalculator = require('../utils/priceCalculator');

const fetchAddress = async ({ start, end }) => {
  const fetchLocation = async (location) => {
    const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${location.lng}&y=${location.lat}&input_coord=WGS84`, {
      headers: {
        'Authorization': `KakaoAK ${process.env.KAKAO_API_KEY}`
      }
    });

    if (!response.ok) {
      console.error("Geocoder request failed with status", response.status);
      throw new Error("Geocoder request failed");
    }

    const data = await response.json();

    if (!data.documents || data.documents.length === 0) {
      throw new Error(`No data found for location: ${(location)}`);
    }
    
    let foundAddress = data.documents[0].road_address;
    
    if (!foundAddress) {
      foundAddress = data.documents[0].address;
    }
    
    if (!foundAddress) {
      throw new Error(`No data found for location: ${(location)}`);
    }

    return foundAddress;
  };

  const startAddress = await fetchLocation(start);
  const endAddress = await fetchLocation(end);

  return { startAddress, endAddress };
};

const deg2rad = (deg) => deg * (Math.PI / 180);

const calculateDistance = ({ start, end }) => {
  const R = 6371; 
  const dLat = deg2rad(end.lat - start.lat);
  const dLon = deg2rad(end.lng - start.lng);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(start.lat)) * Math.cos(deg2rad(end.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; 
  return distance;
};


const calculatePrice = async ({ start, end }) => {
  const distance = calculateDistance({ start, end });
  const price = priceCalculator.calculatePrice(distance);

  return  price;
};

module.exports = { fetchAddress, calculatePrice };
