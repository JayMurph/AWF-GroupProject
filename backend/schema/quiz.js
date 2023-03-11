const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    //_id: String
    category: String,
    qTxt: String,
    qAns: Number,
    a1Txt: String,
    a2Txt: String,
    a3Txt: String,
    a4Txt: String
})

module.exports = mongoose.model("quizzes", quizSchema);