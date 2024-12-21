const { signup, login } = require('../Controllers/AuthControllers.jsx');
const { SignupValidation, LoginValidation } = require('../Middlewares/AuthValidation.jsx');

const router = require('express').Router();

router.post('/login',LoginValidation,login);

router.post('/signup',SignupValidation,signup);

module.exports = router;