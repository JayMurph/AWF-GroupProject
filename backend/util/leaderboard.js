const leaderboardModel = require('../models/leaderboard');
const { isEmptyObject } = require('../util/isEmptyObject');
const PAGE_SIZE = parseInt(process.env.LEADERBOARD_PAGING_SIZE);

async function queryLeaderboard(paramObj, res, page) {
  var query = page != undefined 
  ? leaderboardModel.find(paramObj).skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE).sort({finalScore: -1})
  : leaderboardModel.find(paramObj).sort({finalScore: -1});

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

async function findPageInLeaderboard(paramObj, res) {
  var initialQuery = await leaderboardModel.aggregate([
    { $match: { category: paramObj.category } },
    { $sort: { finalScore: -1 } }
  ])

  //iterate w/ cursor
  let idx = 1;
  let payload;
  for await (const doc of initialQuery) {

    if(doc._id.toString() == paramObj._id.toString()) {
      let gPos = idx; //global position
      
      let page = Math.ceil(gPos / PAGE_SIZE);
      let pagePosition = gPos % PAGE_SIZE;
      pagePosition = (pagePosition === 0) ? pagePosition = PAGE_SIZE : pagePosition = pagePosition;
      payload = {
          _id: paramObj._id,
          score: paramObj.score,
          globalPosition: gPos,
          page: page,
          pagePosition: pagePosition
      }

      break;
    }

    idx++;
  }

  res.contentType('json').send(payload);
  return;
}

module.exports = {
    PAGE_SIZE,
    queryLeaderboard, findPageInLeaderboard
}