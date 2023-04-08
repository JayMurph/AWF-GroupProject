var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const { generateAccessToken, authToken, insertRefreshToken, removeRefreshToken, findRefreshToken } = require('../util/auth');
const { validateUserLogin } = require('../util/validation');
const { isEmptyObject } = require('../util/isEmptyObject');

//test endpoint used in test suite
router.get('/data', authToken, (req, res, next) => {
    //console.log(req.tokenPayload);
    res.json({data: "This is the data that required authentication."});
});

router.post('/login', async (req, res, next) => {
    if(isEmptyObject(req.body)) {
        res.sendStatus(400);
        return;
    }

    const login = await tryLogin(req.body);
    if(login.success === false) {
        res.sendStatus(404);
        return;    
    }

    //TODO: After consultation with Frontend team, alter what gets encoded into the JWT 
    const payload = {
        sub: login._id,
        userName: login.userName,
        password: login.password
    };

    const accessToken = generateAccessToken(payload, process.env.ACCESS_TOKEN_LIFETIME);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    const result = await insertRefreshToken({refreshToken: refreshToken});

    return (result === true) ? res.json({accessToken: accessToken, refreshToken: refreshToken}) : res.sendStatus(500);
    //TODO: Explore saving JWT tokens to Cookie storage.
});

router.delete('/logout', async (req, res) => {
    if(isEmptyObject(req.body)) {
        res.sendStatus(400);
        return;
    }

    const refreshToken = req.body.refreshToken;
    const result = await removeRefreshToken({refreshToken: refreshToken});

    return (result === true) ? res.sendStatus(204) : res.sendStatus(500);
});

router.post('/renew', async (req, res) => {
    if(isEmptyObject(req.body)) {
        res.sendStatus(400);
        return;
    }

    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);
    if (!await findRefreshToken({refreshToken: refreshToken})) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({sub: user.sub, userName: user.userName}, process.env.ACCESS_TOKEN_LIFETIME);
        res.json({accessToken: accessToken});
    });
});

async function tryLogin(requestBody) {
    const {error} = validateUserLogin(requestBody);
    if (error) {
        return { success: "false" };
    }

    const user = await(userModel.findOne({userName: requestBody.userName}));
    if (!user) {
        console.log("Couldn't find user")
        return { success: "false" };
    }

    if (user.password !== requestBody.password) {
        console.log(`${user.password} vs ${requestBody.password}`);
        console.log("Passwords do not match")
        return { success: "false" };
    }

    //console.log("Login user lookup successful");
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        birthDate: user.birthDate,
        password: user.password,
        success: 'true'
    };
}

module.exports = router;