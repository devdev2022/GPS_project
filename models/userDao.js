const { database } = require("./dataSource");

const createUser = async (id, hashedPassword, name, phonenumber) => {
  try {
    return await database.query(
      `INSERT INTO users(
                name, 
                user_id, 
                user_pw, 
                phone_number
                ) 
            VALUES (?, ?, ?, ?);
            `,
      [id, hashedPassword, name, phonenumber]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const usersignIn = async (id) => {
  try {
    return await database.query(
      `SELECT
        user_id, 
        user_pw
      FROM
        users
      WHERE
        id = ?`,
      [id]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUserById = async (id) => {
  const result = await database.query(
    `
		SELECT *
		FROM users u
		WHERE u.user_id=?`,
    [id]
  );

  return result[0];
};

module.exports = {
  createUser,
  getUserById,
  usersignIn
};
