const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControl');
const authAdmin = require('../middleware/authAdmin');
const authPermissions = require('../middleware/authPermissions');

router.use(authAdmin);


router.post('/login', adminController.loginAdmin); //Admin login
router.get('/users', authPermissions(['manage_users']), adminController.getAllUsers); //get all users
router.delete('/users/:userId', authPermissions(['manage_users']), adminController.deleteUser); //delete a user
router.put('/users/:userId/promote-to-admin', authPermissions(['manage_users']), adminController.promoteToAdmin); //premote to admin
router.put('/users/:userId/promote-to-moderator', authPermissions(['manage_users']), adminController.promoteToModerator); //premote to moderator
router.put('/users/:userId/denote-to-user', authPermissions(['manage_users']), adminController.demoteToUser); //denote to user
router.put('/users/:userId/denote-to-moderator', authPermissions(['manage_users']), adminController.demoteToModerator); //denote to moderator

exports.routes = router;