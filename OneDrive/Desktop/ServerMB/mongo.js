const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://Hettttt:Hetrathod510@hettttt.r5p8g89.mongodb.net/')
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Could not connect to MongoDB", err));



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    minlength: [2, "Name Must be at lease 2 character"],
    trim: true
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password Must be at lease 6 character"],
  },

  role: {
    type: String,
    required: true,
    enum: ["Student", "Mentor", "Admin"],
    default: "Student"
  }
});

const User = mongoose.model('User', userSchema);



app.get('/', (req, res) => {
    res.send('Hello kese ho app!');
});



app.post("/add-user", async (req, res) => {
    try{
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(201).json(savedUser);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



app.get("/users", async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
});



app.get("/users/:id", async (req,res)=>{
    try{

        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        res.json(user);

    }catch(err){
        res.status(500).json({error:err.message});
    }
});




app.put("/users/:id", async (req,res)=>{
    try{

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );

        if(!updatedUser){
            return res.status(404).json({message:"User not found"});
        }

        res.json(updatedUser);

    }catch(err){
        res.status(400).json({error:err.message});
    }
});




app.delete("/users/:id", async (req,res)=>{
    try{

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if(!deletedUser){
            return res.status(404).json({message:"User not found"});
        }

        res.json({message:"User deleted successfully"});

    }catch(err){
        res.status(500).json({error:err.message});
    }
});




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});