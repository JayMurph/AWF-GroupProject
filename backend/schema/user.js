const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    birthDate:{
        type: Date
    },
    password:{
        type: String,
        required: true
    },
    passwordConfirmation:{
        type: String,
        required: true
    }
});

module.exports = userSchema;