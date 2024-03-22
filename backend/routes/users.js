const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');
const authToken = require('../middleware/authUser');
const authPermissions = require('../middleware/authPermissions');

router.use(authToken);


router.put('/change-password', authPermissions(['change_own_password']), userController.changeUserPassword); //change users password
router.delete('/delete-account',authPermissions(['delete_own_account']), userController.deleteUser); //delete account
router.put('/profile', authPermissions(['update_own_profile']), userController.updateUserProfile); //update account
router.get('/profile', userController.getUserProfile); //get profile

exports.routes = router;