const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Permissions = require('../middleware/Permissions');


exports.loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const adminUser = await User.findOne({ email: email});

        if(!adminUser || !adminUser.isAdmin){
            return res.status(401).json({ message: "Invalid credentials"});
        }

        const isPasswordMatch = await bcrypt.compare(password, adminUser.password);
        if (!isPasswordMatch){
            return res.status(401).json({ message: "Invalid password"});
        }

        const payload = {
            user: {
              id: adminUser.id,
              email: adminUser.email,
              role: adminUser.role // Optionally include user's role in the payload
            }
        }
        jwt.sign(payload, 'secretKey', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
          });

    } catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// GET api/admin/users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
};

exports.getAllPosts = async (req, res) => {
    res.send("Welcome Admin")
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully', deletedUser });
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
};

exports.deletePost = async (req, res) => {
    res.send("Welcome Admin")
};

exports.promoteToAdmin = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Update user's role to admin
        user.isAdmin = true;
        user.role = Permissions.admin;
        await user.save();
        
        res.json({ message: 'User promoted to admin successfully' });
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
};

exports.promoteToModerator = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Update user's role to moderator
        user.isModerator = true;
        user.role = Permissions.moderator;
        await user.save();
        
        res.json({ message: 'User promoted to moderator successfully' });
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
};

exports.demoteToModerator = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Update user's role from admin to moderator
        user.isAdmin = false;
        user.isModerator = true;
        user.role = Permissions.moderator;
        await user.save();
        
        res.json({ message: 'User demoted from admin successfully' });
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
};

exports.demoteToUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Update user's role to regular user
        user.isAdmin = false;
        user.isModerator = false;
        user.role = Permissions.user;
        await user.save();
        
        res.json({ message: 'User demoted from moderator successfully' });
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
};