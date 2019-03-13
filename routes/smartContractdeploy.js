var express = require('express');
var router = express.Router();
let fs = require("fs");
let Web3 = require('web3');
const log4js = require('log4js');


log4js.configure({
    appenders: { smartcontract: { type: 'file', filename: './logs/smartcontract.log' } },
    categories: { default: { appenders: ['smartcontract'], level: 'all' } }
  });
  
var logger = log4js.getLogger('app');

var obj = require("../public/Setting.json");


router.get('/', (req, res, next)=> {
  logger.info("welcome to logger")
    res.send('call from smart contractfile' +obj.ethereumUri );
  });
module.exports = router;