var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();

const leaderboardSchema = require('../schema/leaderboard');
const leaderboardModel = mongoose.model("leaderboard", leaderboardSchema);

router.get('/', async (req, res) =>{
    console.log("/leaderboard requested");
    console.log(req.query);

    if (isEmptyObject(req.query)) {
      res.sendStatus(400);
      return;
    }

    if (req.query.category != null && req.query.userId == null) {
      await queryLeaderboardForCategory(req.query.category, res);
      return;
    }

    if (req.query.category == null && req.query.userId != null) {
      await queryLeaderboardForUserRecords(req.query.userId, res);
      return;
    }

    //when category and userId both exist handle and make this unreachable
    res.sendStatus(501);
});

async function queryLeaderboardForCategory(cat, res) {
  var query = leaderboardModel.find({category: cat});

  await query.exec((err, qRes) => {
    if (isEmptyObject(qRes)) {
        res.sendStatus(404);    
        return;
    } else {
        res.contentType('json').send(qRes);
        return;
    }
  });
}

async function queryLeaderboardForUserRecords(id, res) {
  var query = leaderboardModel.find({userId: id});

  await query.exec((err, qRes) => {
    if (isEmptyObject(qRes)) {
        res.sendStatus(404);    
        return;
    } else {
        res.contentType('json').send(qRes);
        return;
    }
  });

}

function isEmptyObject(obj) {
  if (obj === null || obj === undefined) {
    return false;
  } else {
    return !Object.keys(obj).length;
  }
}



module.exports = router;