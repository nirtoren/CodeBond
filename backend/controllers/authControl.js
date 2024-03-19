const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    try{
        const {email, password, username} = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({message: 'User already exists'});

        user = new User({ username, email, password});
        console.log(user);
        await user.save();
        res.status(200).json({message: 'User successfully registered'});
    } catch(err){
        res.status(500).json(err);
    }
};

exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) return res.status(401).json({message: 'Invalid credentials, User not found'});
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({message: 'Invalid credentials, password is Incorrect'});

        const payload = {user: {id: user.id}};
        jwt.sign(payload, 'secretKey', {expiresIn: '1h'}, ( err, token ) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch(err){
        res.status(500).json(err);
    }
    
};
