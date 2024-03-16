// userController.js
const userModel = require('../models/userModel');

// Create a new user
exports.createUser = (req, res) => {
  const { username, email, password, bio } = req.body;
  userModel.createUser(username, email, password, bio)
    .then(userId => {
      res.json({ id: userId });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

// Get all users
exports.getUsers = (req, res) => {
  userModel.getAllUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

// ... (Add other controller methods for updating and deleting users)