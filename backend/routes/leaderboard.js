var express = require('express');
var router = express.Router();

const { isEmptyObject } = require('../util/isEmptyObject');
const { queryLeaderboard } = require('../util/leaderboard');

router.get('/', async (req, res) =>{

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

    //this should be unreachable
    res.sendStatus(501);
});

module.exports = router;