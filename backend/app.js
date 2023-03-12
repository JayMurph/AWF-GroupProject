const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
var app = express();

//ROUTES
var indexRouter = require('./routes/index');
var quizRouter = require('./routes/quiz');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
app.use('/', indexRouter);
app.use('/quiz', quizRouter);

mongoose.set('strictQuery', true);
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(`mongodb://127.0.0.1/AWFdb`);
}

app.use((req, res, next) => {
    next(createError(404));
})

module.export = app;