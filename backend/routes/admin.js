const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');
const authToken = require('../middleware/authToken');
const authPermissions = require('../middleware/authPermissions');

router.use(authToken);


router.post('/login', userController.changeUserPassword); //Admin login
router.get('/users', userController.changeUserPassword); //get all users
router.delete('/users/:userId', userController.changeUserPassword); //delete a user
router.post('/users/:userId/promote', userController.changeUserPassword); //premote a user to moderator
router.post('/users/:userId/denote', userController.changeUserPassword); //denote a user

exports.routes = router;