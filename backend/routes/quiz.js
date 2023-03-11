var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    console.log(`/quiz requested`);
    res.send(`/quiz requested`);
});

module.exports = router;