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
        console.log(err)
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


const getFindReservations = async (req, res) => {
    try {
        let rsrvDateTime = req.query.rsrvDateTime; 
        let location = req.query.location;
        let driverUserId = req.driver.USER_ID;

        let driverQuery = 'SELECT id FROM driver WHERE USER_ID = ?';
        let driverResult = await database.query(driverQuery, [driverUserId]);
        let driverId = driverResult[0]?.id; 

        let query = 
        `SELECT r.* 
        FROM reservation r 
        LEFT JOIN reservation_driver rd 
        ON r.ID = rd.RESERVATION_ID 
        `;
        let params = [];
        let hasCondition = false;

        if (rsrvDateTime) {
            query += (hasCondition ? ' AND' : ' WHERE') + 
                    ' DATE(r.RESERVATION_DATE_TIME) = ?';
            params.push(rsrvDateTime);
            hasCondition = true;
        }

        if (location) {
            query += (hasCondition ? ' AND' : ' WHERE') + 
                    ' (r.DEPARTURE_ADDRESS LIKE ? OR r.DESTINATION_ADDRESS LIKE ?)';
            params.push(`%${location}%`, `%${location}%`);
            hasCondition = true;
        }

        if (driverId) {
            query += (hasCondition ? ' AND' : ' WHERE') + 
                    ' (rd.DRIVER_ID = ? OR rd.DRIVER_ID IS NULL)';
            params.push(driverId);
        } else {
            query += (hasCondition ? ' AND' : ' WHERE') + 
                    ' (rd.DRIVER_ID IS NOT NULL OR rd.DRIVER_ID IS NULL)';
        }

        const reservations = await database.query(query, params);
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: 'INVALID_INPUT' });
    }
};




module.exports = {
    createReservationDriver,
    getDriverByReservationId,
    getFindReservations
};
