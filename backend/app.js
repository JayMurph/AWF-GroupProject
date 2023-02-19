const express = require("express");
const Joi = require("joi");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

//test - beyond dummy data
var quizzes = [
  {_id: "GuId832645", category: "Science", qTxt: "The chemical symbol for Gold is:", qAns: 4, a1Txt: "Ag", a2Txt: "Gl", a3Txt: "Fe", a4Txt: "Au"},
  {_id: "gUiD696969", category: "Literature", qTxt: "War and Peace was written by:", qAns: 2, a1Txt: "William Shakespeare", a2Txt: "Leo Tolstoy", a3Txt: "Fyodor Dostoyevsky", a4Txt: "Margaret Gilbert"},
  {_id: "GUID797979", category: "Literature", qTxt: "The Handmaiden's Tale was written by:", qAns: 3, a1Txt: "Jane Austen", a2Txt: "Mary Shelley", a3Txt: "Margaret Atwood", a4Txt: "Margaret Thatcher"}
];
  
app.use(express.json());

app.get("/styles.css", function(req, res) {
  res.sendFile(__dirname + "/styles.css");
});

app.get("/", (req, res) => {
    res.contentType = res.type("html");
    res.sendFile(__dirname + "/main.html");
}).listen(port);
