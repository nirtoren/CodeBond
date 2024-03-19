const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');
const authToken = require('../middleware/authToken');
const authPermissions = require('../middleware/authPermissions');

router.use(authToken);


router.put('/change-password', userController.changeUserPassword); //change users password
router.delete('/delete-account',authPermissions(['update_own_profile']), userController.deleteUser); //delete account
router.put('/profile', userController.updateUserProfile); //update account
router.get('/profile', userController.getUserProfile); //get profile

exports.routes = router;