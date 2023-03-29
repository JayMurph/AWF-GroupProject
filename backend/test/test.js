require('dotenv-flow').config();
console.log(`Environment\nPORT: ${process.env.PORT}`);
console.log(`DBHOST: ${process.env.DBHOST}`);

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../server');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const leaderboardSchema = require('../schema/leaderboard');
const leaderboardModel = mongoose.model("leaderboards", leaderboardSchema);

const quizSchema = require('../schema/quiz');
const quizModel = mongoose.model("quizzes", quizSchema);

const userSchema = require('../schema/user');
const userModel = mongoose.model("users", userSchema);


chai.use(chaiHttp);

//clean up test database
after((done) => {
    leaderboardModel.deleteMany({});
    quizModel.deleteMany({});
    userModel.deleteMany({});
    done();
});

describe('/quiz tests', () => {
    it('TestIndexRoute', (done) => {

        chai.request(server)
        .get('/')
        .end((err, res) => {
            expect(res.status).to.be.equal(200);
            done();
        });
    });

    it('TestQuizRouteGET', (done) => {

        chai.request(server)
        .get('/quiz')
        .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a('array');
            done();
        });
    });

    it('TestQuizRouteGET?CATEGORY=HISTORY', (done) => {
        chai.request(server)
        .get('/quiz')
        .query({category: 'history'})
        .end((err, res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a('array');
            done();
        });
    });
});