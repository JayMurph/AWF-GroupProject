const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var cors = require('cors');

const port = process.env.PORT || 3000;
var app = express();

app.listen(port);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//ROUTES
var indexRouter = require('./routes/index');
var quizRouter = require('./routes/quiz');
var signupRouter = require('./routes/signup');
var profileRouter = require('./routes/profile');
var leaderboardRouter = require('./routes/leaderboard');

app.use('/', indexRouter);
app.use('/quiz', quizRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);
app.use('/leaderboard', leaderboardRouter);

mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
    //await mongoose.connect(`mongodb://127.0.0.1/AWFdb`);
    await mongoose.connect(`mongodb+srv://mDremo5093:iLnyHvHoAJjnivhF@cluster0.unkvw0a.mongodb.net/quizzes`);
}

app.use((req, res, next) => {
    next(createError(404));
})

module.export = app;