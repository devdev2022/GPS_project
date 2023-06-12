const { database } = require("./dataSource");

const createReservation = async (
    rsrvDateTime,
    departureAddress, 
    startlat, 
    startlng, 
    destinationAddress, 
    endlat, 
    endlng, 
    userId, 
    payment
  ) => {
    try {
      return await database.query(
        `INSERT INTO reservation (
          RESERVATION_DATE_TIME,
          DEPARTURE_ADDRESS, 
          DEPARTURE_LAT, 
          DEPARTURE_LON, 
          DESTINATION_ADDRESS, 
          DESTINATION_LAT, 
          DESTINATION_LON, 
          USER_ID, 
          PAYMENT
          ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          rsrvDateTime,
          departureAddress, 
          startlat, 
          startlng, 
          destinationAddress, 
          endlat, 
          endlng, 
          userId, 
          payment
        ]
      );
    } catch (err) {
      const error = new Error("INVALID_DATA_INPUT");
      error.statusCode = 500;
      throw error;
    }
  };

const getReservationByuserId = async (userId) => {
    const result = await database.query(
      `
          SELECT 
              id,
              date,
              RESERVATION_DATE_TIME,
              user_id,
              departure_address,
              departure_lat,
              departure_lon,
              destination_address,
              destination_lat,
              destination_lon, 
              payment,
              reservation_status
          FROM reservation
          WHERE user_id=?`,
      [userId]
    );
  
    return result;
  };

  const updateStatus = async (status, ReservationId) => {
    try {
        return await database.query(
            `UPDATE reservation
            SET reservation_status = ?
            WHERE ID = ?`,
            [status, ReservationId]
        );
    } catch (err) {
        console.log(err)
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
  createReservation,  
  getReservationByuserId,
  updateStatus 
};