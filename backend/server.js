const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv-flow').config();
var port = process.env.PORT || 3000;
var server = express();

server.listen(port);
server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));
server.use(cors({ origin:"*" }));

//ROUTES
var indexRouter = require('./routes/index');
var docsRouter = require('./routes/docs');
var quizRouter = require('./routes/quiz');
var signupRouter = require('./routes/signup');
var profileRouter = require('./routes/profile');
var leaderboardRouter = require('./routes/leaderboard');
var authRouter = require('./routes/auth');

server.use('/', authRouter);
server.use('/', indexRouter);
server.use('/api', docsRouter);
server.use('/quiz', quizRouter);
server.use('/signup', signupRouter);
server.use('/profile', profileRouter);
server.use('/leaderboard', leaderboardRouter);

mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
    console.log(`Connecting to db@${process.env.DBHOST}`)
    await mongoose.connect(process.env.DBHOST);
}

server.use((req, res, next) => {
    next(createError(404));
})

module.exports = server;