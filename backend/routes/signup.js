const { json } = require('express');
var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var userSchema = require('../schema/user');

const userModel = mongoose.model("users", userSchema);

router.post('/', async(req, res) =>{
    console.log("/signup posted to");
    console.log(req.body);
    try {
        const result = await CreateProfile(JSON.stringify(req.body));
        res.status(201).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).send('Error');
    }
});

async function CreateProfile(userContents) {
   try {
    const userReq = JSON.parse(userContents);
     const result = await userModel.create({
       _id: new mongoose.Types.ObjectId(),
       firstName: userReq.firstName,
       lastName: userReq.lastName,
       userName: userReq.userName,
       email: userReq.email,
       birthDate: userReq.birthDate,
       password: userReq.password,
       passwordConfirmation: userReq.passwordConfirmation
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