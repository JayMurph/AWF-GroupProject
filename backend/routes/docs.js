var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/docs', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
    res.sendFile(path.resolve(__dirname, '../public/styles.css'));
});

module.exports = router;