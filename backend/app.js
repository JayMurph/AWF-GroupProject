const express = require("express");
const Joi = require("joi");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

//test - beyond dummy data, meant to look like mongodb entries
const quizzes = [
  {_id: "GuId832645", category: "Science", qTxt: "The chemical symbol for Gold is:", qAns: 4, a1Txt: "Ag", a2Txt: "Gl", a3Txt: "Fe", a4Txt: "Au"},
  {_id: "gUiD696969", category: "Literature", qTxt: "War and Peace was written by:", qAns: 2, a1Txt: "William Shakespeare", a2Txt: "Leo Tolstoy", a3Txt: "Fyodor Dostoyevsky", a4Txt: "Margaret Gilbert"},
  {_id: "GUID797979", category: "Literature", qTxt: "The Handmaiden's Tale was written by:", qAns: 3, a1Txt: "Jane Austen", a2Txt: "Mary Shelley", a3Txt: "Margaret Atwood", a4Txt: "Margaret Thatcher"}
];

const leaderboard = [
  {_id: "ggguuiiddd", category: "History", userID: "GUID_1", finalScore: 60, timeStamp: "2023-02-21 13:00:00"},
  {_id: "gGguuiidDd", category: "History", userID: "GUID_2", finalScore: 59, timeStamp: "2023-02-21 13:02:00"},
];


app.use(express.json());

app.get("/styles.css", function(req, res) {
  res.sendFile(__dirname + "/styles.css");
});

app.get("/", (req, res) => {
    res.contentType = res.type("html");
    res.sendFile(__dirname + "/main.html");
}).listen(port);

app.get("/quiz", (req, res) => {
  if (isEmptyObject(req.query)) {
    res.contentType = res.type("json");
    res.send(quizzes); 
  }

  let filtered = [];

  const filters = req.query.category;
  console.log("Filtering by: [" + req.query.category + "]");
  
  //filter by category
  filtered = quizzes.filter((item) => {
    if (item.category === filters) {
      return true;
    }

    return false;
  });
  
  console.log(filtered);
  res.contentType = res.type("json");
  res.send(filtered);
});

app.post("/quiz", (req, res) => {
  const leaderboardEntry = {
    userID: req.body.userID,
    finalScore: req.body.finalScore,
    timeStamp: req.body.timeStamp,
  };

  const {error} = validateLeaderboardEntry(leaderboardEntry);
  if (error) {
    res.status(400).send(error.message);
    console.log(error.message);
    return;
  }

  //TODO: Add call to mongodb to insert leaderboard entry.

  console.log(leaderboardEntry);
  res.status(200).send();
});

app.get("/leaderboard", (req, res) => {
  if (isEmptyObject(req.query)) {
    res.contentType = res.type("json");
    res.send(quizzes); 
  }

  //TODO: Filter by category (via mongodb .find()?, or via API?)

  //TODO: Match by userID (via mondodb)

});

function validateLeaderboardEntry(requestBody) {
  //TODO: Once the project has become more fleshed out, come back and update the Joi schema to fit better.
  const schema = Joi.object({
    userID: Joi.string().alphanum().required(),
    finalScore: Joi.number().min(0).required(),
    timeStamp: Joi.string().required()
  });

  return schema.validate(requestBody);
}


function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}