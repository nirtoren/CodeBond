const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndDelete(req.user.id);
        res.json({message: 'User deleted successfully'});
    } catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
};

// GET api/users/profile - get users profile
exports.getUserProfile = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        if (user) return res.status(200).json(user);
    } catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }
    
};

// PUT api/users/profile - update users profile
exports.updateUserProfile = async (req, res, next) => {
    try{
        const { username, email } = req.body;
        const user = await User.findById(req.user.id);

        if (username !== undefined){
            user.username = username;
        }
        if (email !== undefined){
            user.email = email;
        }

        await user.save();
        res.json({message: 'Updated user profile'});
    } catch (err) {
        console.error(err);
        res.json({message: 'Error updating user profile'});
    }
};


// POST api/users/password - change password to new one
exports.changeUserPassword = async (req, res, next) => {
    try{
        const {oldPassword, newPassword} = req.body;
        const user = await User.findById(req.user.id);

        const isPasswordMatch = await user.comparePassword(oldPassword);
        if (!isPasswordMatch){
            return res.status(400).json({message: "Invalid old password"});
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({message: "Password updated successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server error"});
    }
};

// POST api/users/forgot-password
exports.resetUserPassword =  (req, res, next) => {
    res.send('Home page');
};
