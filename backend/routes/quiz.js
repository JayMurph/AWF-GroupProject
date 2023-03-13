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
            //console.log(req.query.category);
            //const query = quizModel.find({category: {$regex: `${req.query.category}`, $options: 'i'}});
            //const query = quizModel.aggregate([{$match: {$regex: `${req.query.category}`, $options: 'i'}}, {$sample: {size: 1} }]);
            const pipeline = [
                {$match: {category: {$regex: `${req.query.category}`, $options: 'i'}}},
                {$sample: {size: 2}}
            ];

            const cursor = quizModel.aggregate(pipeline);

            /*query.select("qTxt");
            query.select("qAns");
            query.select("a1Txt");
            query.select("a2Txt");
            query.select("a3Txt");
            query.select("a4Txt");
            query.limit(1);*/
            
            var qRes = [];
            for await (const doc of cursor) {
                qRes.push(doc);
            }

            console.log(qRes);
            res.send(qRes);
            /*await query.exec((err, qRes) => {
                console.log(qRes);
                res.contentType('json').send(qRes);
            });*/
        } else {
            res.sendStatus(400);
        }
    }

    //console.log(req.query);
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
    timeStamp: Joi.string().required()
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