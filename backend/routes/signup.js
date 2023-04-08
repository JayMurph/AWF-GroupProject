const { json } = require('express');
var express = require('express');
var Joi = require('joi');
var mongoose = require("mongoose");
var router = express.Router();
var userModel = require('../models/user');

router.post('/', async (req, res) => {
  //console.log("/signup posted to");
  //console.log(req.body);
  try {
    const result = await CreateProfile(JSON.stringify(req.body), res);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

async function CreateProfile(userContents, res) {
  const userReq = JSON.parse(userContents);

  //use joi to validate POST body 
  const { error } = validateUserEntry(userReq);
  if (error) {
    res.status(400).send(error.message);
    return;
  }

  const result = await userModel.create ({
     _id: new mongoose.Types.ObjectId(),
     firstName: userReq.firstName,
     lastName: userReq.lastName,
     userName: userReq.userName,
     email: userReq.email,
     birthDate: userReq.birthDate,
     password: userReq.password,
  });

  res.status(201).json(result);
  //console.log(result);
}

function validateUserEntry(requestBody) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    birthDate: Joi.string().required(),
    password: Joi.string().alphanum().required(),
  });

  return schema.validate(requestBody);
}

module.exports = {
  CreateProfile
};


module.exports = router;