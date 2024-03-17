const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');


router.get('/:id', userController.getHome); //update user
router.get('/', userController.getHome); //delete user
router.get('/', userController.getHome); //get a user


exports.routes = router;