const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { getUserById } = require("../services/userService");
const { getDriverById } = require("../services/driverService");

const userLoginRequired = async (req, res, next) => {  

  if (!req.headers.authorization) {
    const error = new Error("NEED_ACCESS_TOKEN");
    error.statusCode = 401;
    return res.status(error.statusCode).json({ message: error.message });
  }

  const accessToken = req.headers.authorization.split(' ')[1];

  const decoded = await promisify(jwt.verify)(
    accessToken,
    process.env.JWT_SECRET_KEY
  );

  const user = await getUserById(decoded.id);

  if (!user) {
    const error = new Error("USER_DOES_NOT_EXIST");
    error.statusCode = 404;

    return res.status(error.statusCode).json({ message: error.message });
  }

  req.user = user;
  next();
};

const driverLoginRequired = async (req, res, next) => {    
  
    if (!req.headers.authorization) {
      const error = new Error("NEED_ACCESS_TOKEN");
      error.statusCode = 401;
      return res.status(error.statusCode).json({ message: error.message });
    }

    const accessToken = req.headers.authorization.split(' ')[1];
  
    const decoded = await promisify(jwt.verify)(
      accessToken,
      process.env.JWT_SECRET_KEY
    );
  
    const driver = await getDriverById(decoded.id);
    
    if (!driver) {
      const error = new Error("USER_DOES_NOT_EXIST");
      error.statusCode = 404;
  
      return res.status(error.statusCode).json({ message: error.message });
    }
  
    req.driver = driver;
    next();
  };

module.exports = { userLoginRequired, driverLoginRequired };
