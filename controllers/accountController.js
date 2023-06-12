const accountService = require('../services/accountService');

const userSignUp = async (req, res) => {
    try {
        const { name, id, password, phonenumber } = req.body;
        const newUser = await accountService.userSignUp(name, id, password, phonenumber);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while processing the UserSignUp' });
    }
};

const userSignIn = async (req, res) => {
    try {
        const { id, password } = req.body;
        const token = await accountService.userSignIn(id, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while processing the userSignIn' });
    }
};

const driverSignUp = async (req, res) => {
    try {
        const { name, id, password, phonenumber, carnumber } = req.body;
        const newDriver = await accountService.driverSignUp(name, id, password, phonenumber, carnumber);
        res.status(201).json(newDriver);
    } catch (error) {
        console.log(res)
        res.status(500).json({ message: 'An error occurred while processing the DriverSignUp' });
    }
};

const driverSignIn = async (req, res) => {
    try {
        const { id, password } = req.body;
        const token = await accountService.driverSignIn(id, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while processing the driverSignIn' });
    }
};

module.exports = {
    userSignUp,
    userSignIn,
    driverSignUp,
    driverSignIn
  };
