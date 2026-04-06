const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

router.post("/register", async (req,res) => {
    try {
        console.log("User Model", User);
        console.log("Request Body:", req.body);

        const { name, email, password} = req.body;

        console.log(name,email,password);

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({message: "User registerd successfully"});
    } catch (error) {
        console.log("ERROR", error);   
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async(req,res) => {
    try{
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found"});
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).json({ message: "Invalid credentials"});
        }

        //success
        res.json({ message: "Login successful"});
    }catch (error){
        console.log("ERROR", error);
        res.status(500).json({ error: error.message});
    } 
});

module.exports = router;