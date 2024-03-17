const User = require('../models/userModel');
const bcrypt = require('bcrypt');


exports.getHome =  (req, res, next) => {
    res.send('Home page');
};

exports.updateUser =  async (req, res, next) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(req.body.password, salt); 
            } catch(err){
                res.status(500)
            }
        }
}};

exports.deleteUser =  (req, res, next) => {
    res.send('Home page');
};

exports.getAUser =  (req, res, next) => {
    res.send('Home page');
};
