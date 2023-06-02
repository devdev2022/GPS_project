const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.post("/usersignup", accountController.userSignUp);
router.post("/usersignin", accountController.userSignIn);
router.post("/driversignup", accountController.driverSignUp);
router.post("/driversignin", accountController.driverSignIn);

module.exports = router;
