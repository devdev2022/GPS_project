const express = require('express');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.post("/signup", accountController.userSignUp);
router.post("/signin", accountController.userSignIn);
router.post("/driver/signup", accountController.driverSignUp);
router.post("/driver/signin", accountController.driverSignIn);

module.exports = router;
