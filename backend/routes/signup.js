var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var userSchema = require('../schema/user');

const userModel = mongoose.model("users", userSchema);

router.post('/', async(req, res) =>{
    console.log("/signup posted to");
    console.log(req.body);
    try {
        const result = await CreateProfile();
        res.status(201).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).send('Error');
    }
});

async function CreateProfile() {
   try {
     const result = await User.create({
       firstName: "ExFName",
       lastName: "exLName",
       username: "userName",
       email: "someemail123@gmail.com",
       birthDate: new Date("2001-10-12"),
       password: "abc123",
       passwordConfirmation: "abc123"
     });
     console.log("User created:", result);
   } catch (error) {
     console.error(error);
   }
 }
 
 module.exports ={
     CreateProfile
 };


module.exports = router;