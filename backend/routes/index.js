var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/styles/styles.css', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../styles/styles.css'));
    console.log(`Sending: ${path.resolve(__dirname, '../styles/styles.css')}`);
});

router.get('/', (req, res, next) => {
    res.contentType = res.type('html');
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
    console.log(`Sending: ${path.resolve(__dirname, '../views/index.html')}`);
});

module.exports = router;