const { database } = require("./dataSource");

const createDriver = async (name, id, hashedPassword, phonenumber, carnumber) => {
  try {
    return await database.query(
      `INSERT INTO driver(
                name, 
                user_id, 
                user_pw, 
                phone_number,
                car_number
                ) 
            VALUES (?, ?, ?, ?, ?);
            `,
      [name, id, hashedPassword, phonenumber, carnumber]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const driversignIn = async (id) => {
  try {
    return await database.query(
      `SELECT
        user_id, 
        user_pw
      FROM
        driver
      WHERE
        user_id = ?`,
      [id]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getDriverById = async (id) => {
  const result = await database.query(
    `
		SELECT *		
		FROM driver 
		WHERE user_id=?`,
    [id]
  );

  return result[0];
};

const getDriverBycarnumber = async (carnumber) => {
    const result = await database.query(
      `
          SELECT 
              car_number
          FROM driver
          WHERE car_number=?`,
      [carnumber]
    );
    return result[0];
  };

module.exports = {
  createDriver,
  getDriverById,
  driversignIn,
  getDriverBycarnumber
};
