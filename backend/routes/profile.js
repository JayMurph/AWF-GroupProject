var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();

const userSchema = require('../schema/user');
const userModel = mongoose.model('Users', userSchema);
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
    res.sendStatus(400);
});

//A request to this looks like: uri:port/profile/640e6843c49f1554d5426ae0
router.get('/:userId', async (req, res, next) => {
    console.log(`/profile recieved request for lookup of { userId: ${req.params.userId} }`);
    if (isEmptyObject(req.params)) {
        res.sendStatus(400);
    }

    var query = userModel.find({_id: ObjectId(`${req.params.userId}`)});    

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
                res.contentType('json').send(qRes);
            }
        
        });
    } catch (err) {
        console.error(err);
    }
});

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

module.exports = router;