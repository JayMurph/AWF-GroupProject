const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const ObjectId = Schema.Types.ObjectId;

const leaderboardSchema = new Schema({
    userId:      { type: ObjectId, required: true },
    finalScore:  { type: Number,   required: true },
    category:    { type: String,   required: true },
    timeStamp:   { type: Date,     required: true }
});

module.exports = mongoose.model("leaderboards", leaderboardSchema);