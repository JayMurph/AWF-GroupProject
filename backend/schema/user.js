const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    _id:                  { type: ObjectId, required: true },
    firstName:            { type: String,   required: true },
    lastName:             { type: String,   required: true },
    userName:             { type: String,   required: true },
    email:                { type: String,   required: true },
    birthDate:            { type: Date,     required: true},
    password:             { type: String,   required: true },
    passwordConfirmation: { type: String,   required: true }
});

module.exports = userSchema;