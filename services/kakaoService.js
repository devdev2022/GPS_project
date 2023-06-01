//kakaoService.js
const querystring = require('querystring');

const fetchAddress = async (location) => {
  const geocoderQuery = querystring.stringify({ query: location });

  const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?${geocoderQuery}`, {
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
    throw new Error(`No data found for location: ${location}`);
  }

  return data.documents[0];
};

const fetchTranscoord = async (x, y) => {
  const transcoordQuery = querystring.stringify({
    x,
    y,
    output_coord: 'WGS84'
  });

  const response = await fetch(`https://dapi.kakao.com/v2/local/geo/transcoord.json?${transcoordQuery}`, {
    headers: {
      'Authorization': `KakaoAK ${process.env.KAKAO_API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

const deg2rad = (deg) => deg * (Math.PI / 180);

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const getDistance = async (startLocation, endLocation) => {
  const start = await fetchAddress(startLocation);
  const end = await fetchAddress(endLocation);

  const startTranscoord = await fetchTranscoord(start.x, start.y);
  const endTranscoord = await fetchTranscoord(end.x, end.y);

  const distance = calculateDistance(
    startTranscoord.documents[0].y,
    startTranscoord.documents[0].x,
    endTranscoord.documents[0].y,
    endTranscoord.documents[0].x
  );

  return distance;
};

const calculateTrip = async (startLocation, endLocation) => {
  const distance = await getDistance(startLocation, endLocation);
  const price = await priceCalculator.calculatePrice(startLocation, endLocation);

  return { distance, price };
};

module.exports = { fetchAddress, fetchTranscoord, getDistance, calculateTrip };
