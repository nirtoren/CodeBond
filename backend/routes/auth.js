const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControl');


router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

exports.routes = router;