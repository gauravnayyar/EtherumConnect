var express = require('express');
var router = express.Router();
let fs = require("fs");
const Web3 = require('web3');
const net = require('net');
//var Web3EthAccounts = require('web3-eth-accounts');
const log4js = require('log4js');
var obj = require("../public/setting.json");
var logger = log4js.getLogger('smartcontract');
var web3 = new Web3(new Web3.providers.HttpProvider(obj.ethereumUri));

router.get('/Status', (req, res, next) => {
  if (web3.providers.HttpProvider.prototype.isConnected() == false) {
    logger.error("Error occured while connecting to etherum");
    res.send("Not Connected Error Occured ")
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
  } else {
    logger.info("Successfully connected to etherum");
    res.send("connected");

  }

});

router.post('/createAccount', (req, res, next) => {
  //web3.eth.personal.newAccount();
  res.send("return from createAccount");
});

router.get('/getAccounts', (req, res, next) => {
  web3.eth.getAccounts(function (err, cb) {
    if (err) {
      logger.error(err);
      res.send("Error occured Please check the logs ")
    }
    else {
      res.send(cb);
    }
  });
});


module.exports = router;