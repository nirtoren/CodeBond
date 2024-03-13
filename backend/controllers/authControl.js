const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res, next) => {
    try{

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })    
        
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        console.log(err);
    }
};

exports.loginUser = (req, res, next) => {
    
};