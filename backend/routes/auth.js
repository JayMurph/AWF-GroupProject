var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { generateAccessToken, authToken, insertRefreshToken, removeRefreshToken, findRefreshToken } = require('../util/auth');

router.get('/data', authToken, (req, res, next) => {
    //console.log(req.tokenPayload);
    res.json({data: "This is the data that required authentication."});
});

router.post('/login', async (req, res, next) => {
    //auth

    const payload = {
        sub: req.body.sub,
        userName: req.body.userName,
    }

    const accessToken = generateAccessToken(payload, "60s");
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    const result = await insertRefreshToken({refreshToken: refreshToken});

    return (result === true) ? res.json({accessToken: accessToken, refreshToken: refreshToken}) : res.sendStatus(500);
});

router.delete('/logout', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const result = await removeRefreshToken({refreshToken: refreshToken});

    return (result === true) ? res.sendStatus(204) : res.sendStatus(500);
});

router.post('/token', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);
    if (!await findRefreshToken({refreshToken: refreshToken})) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({sub: user.sub, userName: user.userName}, "60s");
        res.json({accessToken: accessToken});
    });
});

module.exports = router;