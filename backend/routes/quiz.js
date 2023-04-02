var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var Joi = require('joi');

const quizSchema = require('../schema/quiz');
const quizModel = mongoose.model("quizzes", quizSchema);

const leaderboardSchema = require('../schema/leaderboard');
const leaderboardModel = mongoose.model("leaderboard", leaderboardSchema);


//TODO: make a db query that allows this list to be loaded dynamically
const quizCats = ["history", "math", "literature", "science"];

router.get('/', async (req, res) => {
    console.log("/quiz requested");

    //handles with /quiz
    if (isEmptyObject(req.query)) {
        console.log(`req.query`);
        res.contentType('json').send(quizCats);
    } 
    //handles with /quiz?category=
    else if (!isEmptyObject(req.query.category)) {
       
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

            console.log(qRes);
            res.send(qRes);
        } else {
            res.sendStatus(400);
        }
    }
});

router.post('/', async (req, res) => {
    console.log(`/quiz got POST`);
    console.log(req.body);

    //use joi to validate POST body 
    const {error} = validateLeaderboardEntry(req.body);
    if (error) {
        res.status(400).send(error.message);
        console.log(error.message);
        return;
    }

    //once validated move on to the mongoose insertion
    try {
        leaderboardModel.create({
            userId: req.body.userId,
            finalScore: req.body.finalScore,
            category: req.body.category,
            timeStamp: req.body.timeStamp
        });
    } catch(err) {
        console.error(err);
    }

    res.sendStatus(200);
});

function validateLeaderboardEntry(requestBody) {
  //TODO: Once the project has become more fleshed out, come back and update the Joi schema to fit better.
  const schema = Joi.object({
    userId: Joi.string().alphanum().required(),
    finalScore: Joi.number().min(0).required(),
    category: Joi.string().alphanum().required(),
    timeStamp: Joi.date().required()
  });

  return schema.validate(requestBody);
}

function doesCategoryExist(cat) {
    var index = quizCats.indexOf(cat.toLowerCase());
    if (index === -1) {
        return false;
    }
    
    return true;
}

function isEmptyObject(obj) {
    return !Object.keys(obj).length;

}

module.exports = router;