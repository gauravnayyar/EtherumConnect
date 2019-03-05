var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("calll from indexjs and node mon runs");
});

module.exports = router;
