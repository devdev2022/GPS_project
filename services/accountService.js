const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validateid, validatePw, validatecarnumber } = require("../utils/validation");
const userDao = require("../models/userDao");
const driverDao = require("../models/driverDao");

const usersignup = async (id, password, name, phonenumber) => {
  validateid(id);
  
  const user = await userDao.getUserByid(id);
  if (user) {
    throw new Error("DUPLICATED_ID", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userDao.createUser(id, hashedPassword, name, phonenumber);
};

const usersignIn = async (id, password) => {
  validateid(id);
  const user = await userDao.usersignIn(id);
  const is_match = await bcrypt.compare(password, user.password);
  if (!is_match) {
    throw new Error("INVALID_USER", 401);
  }

  const userjwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return userjwtToken;
};

const getUserById = async (id) => {
  const user = await userDao.getUserById(id)
  return user
}


const driversignup = async (id, password, name, phonenumber, carnumber) => {
    validateid(id);
    validatecarnumber(carnumber);
    validatePw(password);
  
    const driver = await driverDao.getDriverById(id);
    if (driver) {
      throw new Error("DUPLICATED_ID", 400);
    }

    const carnum = await driverDao.getDriverBycarnumber(carnumber);
    if (carnum) {
      throw new Error("DUPLICATED_CARNUMBER", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await driverDao.createDriver(id, hashedPassword, name, phonenumber, carnumber);
  };
  
  const driversignin = async (id, password) => {
    validateid(id);
    const driver = await driverDao.getDriverById(id);
    const is_match = await bcrypt.compare(password, driver.password);
    if (!is_match) {
      throw new Error("INVALID_DRIVER", 401);
    }
    
    const driverjwtToken = jwt.sign({ id: driver.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      return driverjwtToken
    };

  const getDriverById = async (id) => {
    const driver = await driverDao.getDriverById(id)
    return driver
  }

module.exports = { usersignup, usersignIn, getUserById, 
                 driversignup, driversignin, getDriverById };