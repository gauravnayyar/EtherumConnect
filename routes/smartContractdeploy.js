var express = require('express');
var router = express.Router();
let fs = require("fs");
let Web3 = require('web3');
router.get('/', (req, res, next)=> {
    res.send('call from smart contractfile');
  });
module.exports = router;