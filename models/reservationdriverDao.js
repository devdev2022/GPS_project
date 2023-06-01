const { database } = require("./dataSource");

const createReservationDriver = async (reservationId, driverId) => {
    try {
        const result = await database.query(
            `INSERT INTO reservation_driver (RESERVATION_ID, DRIVER_ID) VALUES (?, ?);`,
            [reservationId, driverId]
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

module.exports = {
    createReservationDriver,
    getDriverByReservationId
};
