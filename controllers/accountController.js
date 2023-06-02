const accountService = require('../services/accountService');

const userSignUp = async (req, res) => {
    try {
        const { name, id, password, phonenumber } = req.body;
        const newUser = await accountService.usersignup(name, id, password, phonenumber);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
};

const userSignIn = async (req, res) => {
    try {
        const { id, password } = req.body;
        const token = await accountService.usersignIn(id, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
};

const driverSignUp = async (req, res) => {
    try {
        const { name, id, password, phonenumber, carnumber } = req.body;
        const newDriver = await accountService.driversignup(name, id, password, phonenumber, carnumber);
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
};

const driverSignIn = async (req, res) => {
    try {
        const { id, password } = req.body;
        const token = await accountService.driversignin(id, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
};

module.exports = {
    userSignUp,
    userSignIn,
    driverSignUp,
    driverSignIn
  };
