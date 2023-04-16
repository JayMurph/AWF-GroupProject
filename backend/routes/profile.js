var express = require('express');
var router = express.Router();

const userModel = require('../models/user');
const leaderboardModel = require('../models/leaderboard');

const ObjectId = require('mongoose').Types.ObjectId;
const { isEmptyObject } = require('../util/isEmptyObject');
const { authToken } = require('../util/auth');
const { calcStats } = require('../util/profile')

router.get('/', (req, res) => {
    res.sendStatus(400);
});

//A request to this looks like: uri:port/profile/640e6843c49f1554d5426ae0
router.get('/:userId', async (req, res, next) => {
    //console.log(`/profile received request for lookup of { userId: ${req.params.userId} }`);
    if (isEmptyObject(req.params)) {
        res.sendStatus(400);
    }

    const userQuery = await userModel.aggregate([
        { $match: { _id: ObjectId(req.params.userId) } },
        { $project: { firstName: 1, lastName: 1, userName: 1, email: 1 } }
    ]);

    const userLBQuery = await leaderboardModel.aggregate([
        { $match: { userId: ObjectId(req.params.userId) } },
        { $sort: { _id: -1 } },
        { $limit: 10 }
    ]);

    const statQuery = await leaderboardModel.aggregate([
        { $match: {userId: ObjectId(req.params.userId)} },
        { $sort: { finalScore: -1 } }
    ]);

    const [ highestScore, scoreAverage, totalScore, quizzesCompleted ] = calcStats(statQuery);

    if (isEmptyObject(userQuery)) {
        res.sendStatus(404);    
        return;
    }

    res.contentType('json').send({
        _id: req.params.userId,
        firstName: userQuery[0].firstName,
        lastName: userQuery[0].lastName,
        userName: userQuery[0].userName,
        email: userQuery[0].email,
        highestScore: highestScore,
        scoreAverage: scoreAverage,
        totalScore: totalScore,
        quizzesCompleted: quizzesCompleted,
        recentScores: userLBQuery
    });

    return;
});

// a request to delete the profile
router.delete('/:userId', authToken, async (req, res, next) =>{
    //console.log(req.params.userId)

    if (ObjectId.isValid(req.params.userId)) {
        userModel
        .deleteOne({_id: ObjectId(req.params.userId)})
        .then(async doc => {
            res.status(200).json(doc)

            const deleteLeaderboardRes = await leaderboardModel.deleteMany({userId: ObjectId(req.params.userId)});
            if(deleteLeaderboardRes.deletedCount < 1) {
                console.log(`Could not delete leaderboard entries for user: ${req.params.userId}`);
                console.log(`Maybe user did not have any entries?`);
            }
        })
        .catch(err => {
            res.status(500).json({error: ' Could not delete the user'})
        })
    }
})

router.put('/:userId', authToken, async (req, res, next) => {
    //console.log(req.params.userId)
    
    if (ObjectId.isValid(req.params.userId)) {
        const {email, userName, old_password, new_password} = req.body;
        const user = await(userModel.findById(req.params.userId));

        if (!user) {
            res.status(500).json({error:'Could not find user'})
            return;
        }

        if (user.password != old_password) {
            res.status(500).json({error:"Password does not not match old password"})
            return;
        }

        try {

            const result =  await userModel.updateOne(
                {_id: ObjectId(req.params.userId)},
                {$set: {
                    userName: userName, 
                    email: email,
                    password: new_password
                }}
            );

           res.send(result);
        } catch (err) {
            console.error(err);
        }
    }
})

module.exports = router;
