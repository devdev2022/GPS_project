const { database } = require("./dataSource");

const createReservationDriver = async (reservationId, driverId) => {
    try {

        const driver = await database.query(
            `SELECT ID FROM DRIVER WHERE USER_ID = ?`,
            [driverId]
        );
        const driverPk = driver[0].ID;

        const result = await database.query(
            `INSERT INTO reservation_driver (RESERVATION_ID, DRIVER_ID) VALUES (?, ?);`,
            [reservationId, driverPk]
        );
        
        return result.insertId;
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};

const getDriverByReservationId = async (reservationId) => {
    try {
        const result = await database.query(
            `
            SELECT driver.*
            FROM driver
            INNER JOIN reservation_driver ON driver.ID = reservation_driver.DRIVER_ID
            WHERE reservation_driver.RESERVATION_ID = ?;
            `,
            [reservationId]
        );
        return result[0];
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};

//탑승일시, 택시비, 본인과 가까운 출발지 순으로 정렬
/*
const getestimateByDriverId = async (driverId) => {
    try {
        const reservations = await database.query(
            `SELECT R.DEPARTURE_LAT, R.DEPARTURE_LON
            FROM reservation
            INNER JOIN reservation_driver RD ON R.ID = RD.RESERVATION_ID
            WHERE RD.DRIVER_ID = ? AND R.RESERVATION_STATUS = '예약 완료'
            `,
            [driverId]
        );

        return reservations;
    } catch (err) {
        console.log(err);
        const error = new Error("DATABASE_ERROR");
        error.statusCode = 500;
        throw error;
    }
};

const getarrangereservations = async (driverId) => {
    try {
        const reservations = await database.query(
            `SELECT R.ID, R.DATE, R.DEPARTURE_ADDRESS, R.DESTINATION_ADDRESS, R.USER_ID, R.PAYMENT
            FROM reservation R
            INNER JOIN reservation_driver RD ON R.ID = RD.RESERVATION_ID
            WHERE RD.DRIVER_ID = ? AND R.RESERVATION_STATUS = '예약 완료'
            ORDER BY R.DATE, R.PAYMENT;`,
            [driverId]
        );

        return reservations;
    } catch (err) {
        console.log(err);
        const error = new Error("DATABASE_ERROR");
        error.statusCode = 500;
        throw error;
    }
};

const getestimatenoreservedByDriverId = async (driverId) => {
    try {
        const reservations = await database.query(
            `SELECT R.DEPARTURE_LAT, R.DEPARTURE_LON
            FROM reservation
            INNER JOIN reservation_driver RD ON R.ID = RD.RESERVATION_ID
            WHERE RD.DRIVER_ID = ? AND R.RESERVATION_STATUS = '예약 완료'
            `,
            [driverId]
        );

        return reservations;
    } catch (err) {
        console.log(err);
        const error = new Error("DATABASE_ERROR");
        error.statusCode = 500;
        throw error;
    }
};

const getarrangenoreservations = async (driverId) => {
    try {
        const reservations = await database.query(
            `SELECT R.ID, R.DATE, R.DEPARTURE_ADDRESS, R.DESTINATION_ADDRESS, R.USER_ID, R.PAYMENT
            FROM reservation R
            WHERE R.RESERVATION_STATUS = '미완료'
            ORDER BY R.DATE, R.PAYMENT;`,
            [driverId]
        );

        return reservations;
    } catch (err) {
        console.log(err);
        const error = new Error("DATABASE_ERROR");
        error.statusCode = 500;
        throw error;
    }
};
*/


const getfindreservations = async (req, res) => {
    try {
      let date = req.query.date;
      let location = req.query.location;
  
      let query = 'SELECT * FROM reservation WHERE';
      let params = [];
  
      if (date) {
        if (date.length > 10) {
            query += ' DATE = ?';
        } else {
            query += ' DATE(DATE) = ?';
        }
        params.push(date);
      }
  
      if (location) {
        if (params.length > 0) {
          query += ' AND';
        }
        query += ' (DEPARTURE_ADDRESS LIKE ?)';
        params.push(`%${location}%`, `%${location}%`);
      }
  
      const reservations = await database.query(query, params);
      res.status(200).json(reservations);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'An error occurred.' });
    }
  };

module.exports = {
    createReservationDriver,
    getDriverByReservationId,
    getfindreservations
};
