const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validateid, validatepw, validatecarnumber } = require("../utils/validation");
const userDao = require("../models/userDao");
const driverDao = require("../models/driverDao");

const userSignUp = async (name, id, password, phonenumber) => {
  validateid(id);
  validatepw(password);

  const user = await userDao.getUserById(id);
  if (user) {
    throw new Error("DUPLICATED_ID", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userDao.createUser(name, id, hashedPassword, phonenumber);
};

const userSignIn = async (id, password) => {
  
  const user = await userDao.userLogin(id);
  const is_match = await bcrypt.compare(password, user[0].user_pw);
  if (!is_match) {
    throw new Error("INVALID_USER", 401);
  }

  const userjwtToken = jwt.sign({ id: user[0].user_id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
});


  return userjwtToken;
};

const getUserById = async (id) => {
  const user = await userDao.getUserById(id)
  return user
}


const driverSignUp = async (name, id, password, phonenumber, carnumber) => {
    validateid(id);
    validatepw(password);
    validatecarnumber(carnumber);
  
    const driver = await driverDao.getDriverById(id);
    if (driver) {
      throw new Error("DUPLICATED_ID", 400);
    }

    const carnum = await driverDao.getDriverByCarNumber(carnumber);
    if (carnum) {
      throw new Error("DUPLICATED_CARNUMBER", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await driverDao.createDriver(name, id, hashedPassword, phonenumber, carnumber);
  };
  
  const driverSignIn = async (id, password) => {

    const driver = await driverDao.driverLogin(id);
    const is_match = await bcrypt.compare(password, driver[0].user_pw);
    if (!is_match) {
      throw new Error("INVALID_PASSWORD", 401);
    }
    
    const driverjwtToken = jwt.sign({ id: driver[0].user_id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      return driverjwtToken
    };

  const getDriverById = async (id) => {
    const driver = await driverDao.getDriverById(id)
    return driver
  }

module.exports = { userSignUp, userSignIn, getUserById, 
                 driverSignUp, driverSignIn, getDriverById };