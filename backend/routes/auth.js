var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const userModel = require('../models/user');
const { generateToken, authToken, insertRefreshToken, removeRefreshToken, findRefreshToken } = require('../util/auth');
const { validateUserLogin } = require('../util/validation');
const { isEmptyObject } = require('../util/isEmptyObject');

//test endpoint used in test suite
router.get('/data', authToken, (req, res, next) => {
    //console.log(req.tokenPayload);
    res.json({data: "This is the data that required authentication."});
});

router.post('/login', async (req, res, next) => {
    if(isEmptyObject(req.body)) {
        res.status(400).send("Empty request body");
        return;
    }
    const login = await tryLogin(req.body);
    if(login.success === "false") {
        res.status(404).send(login.message);
        return;    
    }

    const payload = {
        sub: login._id,
        firstName: login.firstName,
        userName: login.userName,
        email: login.email,
        password: login.password
    };

    const accessToken = generateToken(payload, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_LIFETIME);
    const refreshToken = generateToken(payload, process.env.REFRESH_TOKEN_SECRET);
    const result = await insertRefreshToken({refreshToken: refreshToken});

    return (result === true) ? res.json({accessToken: accessToken, refreshToken: refreshToken}) : res.sendStatus(500);
});

router.delete('/logout', async (req, res) => {
    if(isEmptyObject(req.body)) {
        res.sendStatus(400);
        return;
    }

    const refreshToken = req.body.refreshToken;
    const result = await removeRefreshToken({refreshToken: refreshToken});

    return (result.success === "true") ? res.status(204).send(result.message) : res.status(500).send(result.message);
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
        const accessToken = generateToken(
            {sub: user.sub, userName: user.userName}, 
            process.env.ACCESS_TOKEN_SECRET,
            process.env.ACCESS_TOKEN_LIFETIME
        );
        res.json({accessToken: accessToken});
    });
});

async function tryLogin(requestBody) {
    const {error} = validateUserLogin(requestBody);
    if (error) {
        return { success: "false", message: error.message };
    }

    const user = await(userModel.findOne({userName: requestBody.userName}));
    if (!user) {
        return { success: "false", message: "User not found" };
    }

    if (user.password !== requestBody.password) {
        console.log(`${user.password} vs ${requestBody.password}`);
        return { success: "false", message: "Passwords do not match" };
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