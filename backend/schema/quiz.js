const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const quizSchema = new Schema({
    category: { type: String,   required: true },
    qTxt:     { type: String,   required: true },
    qAns:     { type: Number,   required: true },
    a1Txt:    { type: String,   required: true },
    a2Txt:    { type: String,   required: true },
    a3Txt:    { type: String,   required: true },
    a4Txt:    { type: String,   required: true }
})

module.exports = quizSchema;