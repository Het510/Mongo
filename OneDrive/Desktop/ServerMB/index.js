const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/flipkart')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const app = express();

// ✅ IMPORTANT (you forgot this)
app.use(express.json());

// Testing route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// ✅ Proper schema (instead of empty)
const userSchema = new mongoose.Schema({
    name: String,
    role: String
});

const User = mongoose.model('users', userSchema);

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Get user by name
app.get('/users/:name', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Orders schema
const orderSchema = new mongoose.Schema({});
const order = mongoose.model('orders', orderSchema);

app.get("/orders", async (req, res) => {
    try {
        const users = await order.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message }); // ✅ fixed
    }
});

// ✅ Create user (THIS IS YOUR POST ROUTE)
app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});