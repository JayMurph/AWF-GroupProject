var express = require('express');
var router = express.Router();

const leaderboardModel = require('../models/leaderboard');
const { isEmptyObject } = require('../util/isEmptyObject');

router.get('/', async (req, res) =>{
    //console.log("/leaderboard requested");
    //console.log(req.query);

    if (isEmptyObject(req.query)) {
      res.sendStatus(400);
      return;
    }

    if (req.query.category != null && req.query.userId == null) {
      await queryLeaderboard({category: req.query.category}, res, req.query.page);
      return;
    }

    if (req.query.category == null && req.query.userId != null) {
      await queryLeaderboard({userId: req.query.userId}, res, req.query.page);
      return;
    }

    if (req.query.category != null && req.query.userId != null) {
      await queryLeaderboard({userId: req.query.userId, category: req.query.category}, res, req.query.page);
      return;
    }

    //when category and userId both exist handle and make this unreachable
    res.sendStatus(501);
});

async function queryLeaderboard(paramObj, res, page) {
  var query = page != undefined 
  ? leaderboardModel.find(paramObj).skip((page - 1) * 5).limit(5).sort({finalScore: -1})
  : leaderboardModel.find(paramObj);

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

module.exports = router;