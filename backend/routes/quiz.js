var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();

const quizSchema = require('../schema/quiz');
const quizModel = mongoose.model("quizzes", quizSchema);

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