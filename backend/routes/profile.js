var express = require('express');
var router = express.Router();

const userModel = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const { isEmptyObject } = require('../util/isEmptyObject');

router.get('/', (req, res) => {
    res.sendStatus(400);
});

//A request to this looks like: uri:port/profile/640e6843c49f1554d5426ae0
router.get('/:userId', async (req, res, next) => {
    //console.log(`/profile received request for lookup of { userId: ${req.params.userId} }`);
    if (isEmptyObject(req.params)) {
        res.sendStatus(400);
    }

    var query = userModel.find({_id: `${req.params.userId}`});    

    query.select("firstName");
    query.select("lastName");
    query.select("userName");
    query.select("email");
    query.limit(1);

    try {
        await query.exec((err, qRes) => {

            if (isEmptyObject(qRes)) {
                res.sendStatus(404);    
            } else {
                if (qRes.length === 1) {
                    res.contentType('json').send(qRes[0]);
                    return;
                }

                res.contentType('json').send(qRes);
            }
        });
    } catch (err) {
        console.error(err);
    }
});

// a request to delete the profile
router.delete('/:userId', async (req, res, next) =>{
    //console.log(req.params.userId)

    if (ObjectId.isValid(req.params.userId)) {
        userModel
        .deleteOne({_id: ObjectId(req.params.userId)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: ' Could not delete the user'})
        })
    }
})

router.put('/:userId', async (req, res, next) => {
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
