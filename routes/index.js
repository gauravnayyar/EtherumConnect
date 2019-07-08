var express = require('express');
var router = express.Router();
var path = require('path');  
var http = require('http');
var router = express.Router();
/* GET home page. */



router.get('/logs', function(req, res, next) {

  res.sendFile(path.join('C:/Users/admin_2/Gaurav/Node/etherumConnect/EtherumConnect/logs/'));

 });

module.exports = router;
