var express = require('express');
var router = express.Router();
var Joi = require('joi');

const quizModel = require('../models/quiz');
const leaderboardModel = require('../models/leaderboard');
const { findPageInLeaderboard } = require('../util/leaderboard');
const { isEmptyObject } = require('../util/isEmptyObject');
const { validateLeaderboardEntry } = require('../util/validation');
const { authToken } = require('../util/auth');

//TODO: make a db query that allows this list to be loaded dynamically
const quizCats = ["history", "math", "literature", "science"];

router.get('/', async (req, res) => {
    //console.log("/quiz requested");

    //handles with /quiz
    if (isEmptyObject(req.query)) {
        res.contentType('json').send(quizCats);
    } 
    //handles with /quiz?category=
    else if (!isEmptyObject(req.query.category)) {
        //console.log(`${req.query.category}`)
        if (doesCategoryExist(req.query.category)) {
            const pipeline = [
                {$match: {category: {$regex: `${req.query.category}`, $options: 'i'}}},
                {$sample: {size: 5}}
            ];

            const cursor = quizModel.aggregate(pipeline);

            var qRes = [];
            for await (const doc of cursor) {
                qRes.push(doc);
            }

            //console.log(qRes);
            res.send(qRes);
        } else {
            res.sendStatus(400);
        }
    }
});

router.post('/', authToken, async (req, res) => {

    //use joi to validate POST body 
    const {error} = validateLeaderboardEntry(req.body);
    if (error) {
        res.status(400).send(error.message);
        console.log(error.message);
        return;
    }

    //once validated move on to the mongoose insertion
    try {
        dbRes = await leaderboardModel.create({
            userId: req.tokenPayload.sub,
            finalScore: req.body.finalScore,
            category: req.body.category,
            timeStamp: req.body.timeStamp
        });
    } catch(err) {
        console.error(err);
    }

    await findPageInLeaderboard({_id: dbRes._id, score: req.body.finalScore, category: req.body.category}, res);

    return;
});

function doesCategoryExist(cat) {
    var index = quizCats.indexOf(cat.toLowerCase());
    if (index === -1) {
        return false;
    }
    
    return true;
}

module.exports = router;