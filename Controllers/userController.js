const User = require('../Models/userModel');

// Controller function to create a new user
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try{
        const { id } = req.params; 
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        res.status(200).json(user);
    }catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}



module.exports = {
    createUser,
    getAllUsers,
    getUserById
};