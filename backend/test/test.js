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
after(async () => {
    await leaderboardModel.deleteMany({});
});

describe('/profile and /signup tests', () => {
    it('POST\t/signup', async () => {
        const res = await chai.request(server)
        .post('/signup')
        .send({
            firstName: "Aubrey",
            lastName: "Graham",
            userName: "Drake",
            email: "drake@ovo.com",
            birthDate: "1986-10-24T00:00:00.000Z",
            password: "secret"
        })

        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.an('object');
    });

    it('GET\t/profile/:userId', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id;

        const res = await chai.request(server).get(`/profile/${lastID}`);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
    });

    it('PUT\t/profile/:userId', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id;
        
        const res = await chai.request(server)
        .put(`/profile/${lastID}`)
        .send({
            userName: "ChampagnePapi",
            email: "drake@ovo.com",
            old_password: "secret",
            new_password: "secret"
        })

        expect(res.status).to.be.equal(200);
        expect(res.body.modifiedCount).to.be.equal(1);
    });
});

describe('/quiz tests', () => {
    it('GET\t/', async () => {
        const res = await chai.request(server).get('/')
        expect(res.status).to.be.equal(200);
    });

    it('GET\t/quiz', async () => {
        const res = await chai.request(server).get('/quiz')

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('GET\t/quiz?category=HISTORY', async () => {
        const res = await chai.request(server).get('/quiz').query({category: 'history'})

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('POST\t/quiz\t{userID: ObjectId(lastID), finalScore: rnd, category: "history", timeStamp: new Date()}', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id; 

        const res = await chai.request(server)
        .post('/quiz')
        .send({
            userId: ObjectId(lastID),
            finalScore: Math.floor(Math.random() * 999),
            category: "history",
            timeStamp: new Date()
        })

        expect(res.status).to.be.equal(200);
    });
});

describe('/leaderboard tests', () => {
    it('GET\t/leaderboard?category=HISTORY', async () => {
        const res = await chai.request(server).get(`/leaderboard?category=history`);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('GET\t/leaderboard?userId=:userId', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id;

        const res = await chai.request(server).get(`/leaderboard?userId=${lastID}`);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('GET\t/leaderboard?category=HISTORY&userId=:userId', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id;

        const res = await chai.request(server).get(`/leaderboard?category=history&userId=${lastID}`);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
    });

    //TODO: develop a test for paging behaviour
});

describe('Destructive tests', () => {
    it('DELETE\t/profile/:userId', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id;

        const res = await chai.request(server).delete(`/profile/${lastID}`);

        expect(res.status).to.be.equal(200);
        expect(res.body.deletedCount).to.be.equal(1);
    });
});