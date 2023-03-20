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
      await queryLeaderboard({category: req.query.category}, res);
      return;
    }

    if (req.query.category == null && req.query.userId != null) {
      await queryLeaderboard({userId: req.query.userId}, res);
      return;
    }

    if (req.query.category != null && req.query.userId != null) {
      await queryLeaderboard({userId: req.query.userId, category: req.query.category}, res);
      return;
    }

    //when category and userId both exist handle and make this unreachable
    res.sendStatus(501);
});

//please rename this if I decide to keep it
async function queryLeaderboard(paramObj, res) {
  var query = leaderboardModel.find(paramObj);

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