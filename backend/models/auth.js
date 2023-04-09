const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const authSchema = new Schema({
    refreshToken:      { type: String, required: true },
});

module.exports = mongoose.model("auths", authSchema);