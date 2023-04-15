const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../server');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const leaderboardModel = require('../models/leaderboard');
const authModel = require('../models/auth');
const userModel = require('../models/user');

var jwt = require('jsonwebtoken');
chai.use(chaiHttp);

console.log(`Environment\nPORT: ${process.env.PORT}`);
console.log(`DBHOST: ${process.env.DBHOST}`);
console.log(`ACCESS_TOKEN_LIFETIME: ${process.env.ACCESS_TOKEN_LIFETIME}`);
console.log(`LEADERBOARD_PAGING_SIZE: ${process.env.LEADERBOARD_PAGING_SIZE}`);

//clean up test database
after(async () => {
    await leaderboardModel.deleteMany({});
    await userModel.deleteMany({});
    await authModel.deleteMany({});
});

describe('/profile and /signup tests', () => {
    it('POST\t/signup\t{firstName: "Aubrey", lastName: "Graham", userName: "Drake", email: "drake@ovo.com", birthDate: "1986-10-24T", password: ... }', async () => {
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

    it('GET\t/profile/:userId "Test fetch user profile"', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id;

        const res = await chai.request(server).get(`/profile/${lastID}`);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
    });

    it('PUT\t/profile/:userId Header: {Authorization: Bearer $accessToken} {userName: "ChampagnePapi", ... } "Test update user profile"', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id;
        
        //console.log(lastID);
        const getTokenRes = await chai.request(server)
        .post('/login')
        .send({
            userName: "Drake",
            password: "secret",
        })           

        const accessToken = getTokenRes.body.accessToken;                   

        const res = await chai.request(server)
        .put(`/profile/${lastID}`)
        .set('Authorization', `Bearer ${accessToken}`)
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
    it('GET\t/\t\t\t"Test get API docs"', async () => {
        const res = await chai.request(server).get('/')
        expect(res.status).to.be.equal(200);
    });

    it('GET\t/quiz\t\t\t"Test get quiz categories."', async () => {
        const res = await chai.request(server).get('/quiz')

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('GET\t/quiz?category=HISTORY\t"Test get history quiz."', async () => {
        const res = await chai.request(server).get('/quiz').query({category: 'history'})

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('POST\t/quiz\tHeader: {Authorization: Bearer $accessToken} {userID: ObjectId(lastID), finalScore: rnd, category: "history", timeStamp: new Date()} "Test post new score"', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id; 

        //console.log(lastID);
        const getTokenRes = await chai.request(server)
        .post('/login')
        .send({
            userName: "ChampagnePapi",
            password: "secret",
        })           

        const accessToken = getTokenRes.body.accessToken;
        //console.log(getTokenRes.body);

        const res = await chai.request(server)
        .post('/quiz')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            userId: ObjectId(lastID),
            finalScore: Math.floor(Math.random() * 999),
            category: "history",
            timeStamp: new Date()
        })

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.globalPosition).to.exist;
        expect(res.body.page).to.exist;
        expect(res.body.pagePosition).to.exist;
    });
});

describe('/leaderboard tests', () => {
    it('GET\t/leaderboard?category=HISTORY\t\t\t"Test get all posted scores from history category"', async () => {
        const res = await chai.request(server).get(`/leaderboard?category=history`);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('GET\t/leaderboard?userId=:userId\t\t\t"Test get all posted scores by $userId"', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id;

        const res = await chai.request(server).get(`/leaderboard?userId=${lastID}`);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('GET\t/leaderboard?category=HISTORY&userId=$userId\t"Test filtering $userId scores by category"', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id;

        const res = await chai.request(server).get(`/leaderboard?category=history&userId=${lastID}`);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
    });

    it('GET\t/leaderboard?category=HISTORY&page=1\t\t"Test pagination with history leaderboard category"',async () => {
        
        await addRandomLeaderboardEntries(new ObjectId());

        const res = await chai.request(server).get(`/leaderboard?category=history&page=1`);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(10);
    });
});

describe('Auth tests', () => {
    it('POST\t/login\t{userName: "ChampagnePapi", password: "secret"}\t\t\t"Login and get issued tokens"', async () => {
        
        const res = await chai.request(server)
        .post('/login')
        .send({
            userName: "ChampagnePapi",
            password: "secret"
        })

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.refreshToken).to.exist;
        expect(res.body.accessToken).to.exist;
    });

    it('POST\t/login\t{userName: "ChampagnePapi", password: "incorrect-password"}\t"Test that incorrect password does not issue tokens"', async () => {
        
        const res = await chai.request(server)
        .post('/login')
        .send({
            userName: "ChampagnePapi",
            password: "incorrect-password"
        })

        expect(res.status).to.be.equal(404);
        expect(res.body.refreshToken).to.not.exist;
        expect(res.body.accessToken).to.not.exist;
    });

    it('POST\t/renew\t{refreshToken: $token}\t\t\t\t\t\t"Get reissued a new access token"', async () => {
        const result = await authModel.findOne({}, {sort: {_id: -1}}).select('refreshToken');
        const refreshToken = result.refreshToken;

        const res = await chai.request(server)
        .post('/renew')
        .send({
            refreshToken: refreshToken
        })

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.accessToken).to.exist;
    });

    it('GET\t/data\tHeader: {Authorization: Bearer $accessToken}\t\t\t"Test if middleware authToken() can grant access"', async () => {
        const result = await authModel.findOne({}, {sort: {_id: -1}}).select('refreshToken');
        const refreshToken = result.refreshToken;

        const getTokenRes = await chai.request(server)
        .post('/renew')
        .send({
            refreshToken: refreshToken
        })
        
        const accessToken = getTokenRes.body.accessToken;
        
        const res = await chai.request(server)
        .get('/data')
        .set('Authorization', `Bearer ${accessToken}`)

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.exist;
    });

    it('GET\t/data\tHeader: {Authorization: Bearer junkToken}\t\t\t"Test if middleware authToken() can restrict access"', async () => {
        const accessToken = "junkToken";
        
        const res = await chai.request(server)
        .get('/data')
        .set('Authorization', `Bearer ${accessToken}`)

        expect(res.status).to.be.equal(403);
    });

    it('DELETE\t/logout\t{refreshToken: $token}\t\t\t\t\t\t"Test if refresh token is invalidated"', async () => {
        const result = await authModel.findOne({}, {sort: {_id: -1}}).select('refreshToken');
        const refreshToken = result.refreshToken;

        const res = await chai.request(server)
        .delete('/logout')
        .send({
            refreshToken: refreshToken
        })

        expect(res.status).to.be.equal(204);
    });
});

describe('Destructive tests', () => {
    it('DELETE\t/profile/:userId\tHeader: {Authorization: Bearer $accessToken}\t\t\t"Test delete user profile"', async () => {
        var lastID = await userModel.findOne({}, {sort: {_id: -1}});
        lastID = JSON.parse(JSON.stringify(lastID))._id;

        const result = await authModel.findOne({}, {sort: {_id: -1}}).select('refreshToken');
        const refreshToken = result.refreshToken;

        const getTokenRes = await chai.request(server)
        .post('/renew')
        .send({
            refreshToken: refreshToken
        })
        
        const accessToken = getTokenRes.body.accessToken;


        const res = await chai.request(server)
        .delete(`/profile/${lastID}`)
        .set('Authorization', `Bearer ${accessToken}`)

        expect(res.status).to.be.equal(200);
        expect(res.body.deletedCount).to.be.equal(1);
    });
});

async function addRandomLeaderboardEntries(id) {
    const quizCats = ["history", "math", "literature", "science"];
    
    const res = await leaderboardModel.insertMany([
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: 'history', timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: 'history', timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: 'history', timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: 'history', timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: 'history', timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: 'history', timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: 'history', timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: 'history', timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: 'history', timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: 'history', timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()},
        { userId: id, finalScore: Math.floor(Math.random() * 4999), category: quizCats[Math.floor(Math.random() * 4)], timeStamp: new Date()}
    ]);
}