const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');


router.get('/', userController.getHome);


exports.routes = router;