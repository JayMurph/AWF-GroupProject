const createError = require('http-errors');
const express = require('express');
const path = require('path');

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

app.use((req, res, next) => {
    next(createError(404));
})

module.export = app;