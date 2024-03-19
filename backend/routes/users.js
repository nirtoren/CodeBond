const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControl');
const authMiddleware = require('../middleware/middleAuth');


router.put('/change-password',authMiddleware, userController.changeUserPassword); //change users password
router.delete('/delete-account',authMiddleware, userController.deleteUser); //delete account
router.put('/profile',authMiddleware, userController.updateUserProfile); //delete account
router.get('/profile',authMiddleware, userController.getUserProfile); //delete account

exports.routes = router;