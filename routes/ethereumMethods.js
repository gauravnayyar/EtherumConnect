var express = require('express');
var router = express.Router();
let fs = require("fs");
const Web3 = require('web3');
const net = require('net');
//var Web3EthAccounts = require('web3-eth-accounts');
const log4js = require('log4js');
var obj = require("../public/setting.json");  
var logger = log4js.getLogger('smartcontract');
var web3 = new Web3(obj.ethereumUri);
 
console.log(web3.eth.getAccounts());;

router.get('/Status', (req, res, next)=> {
  
  debugger
  if(web3.providers.HttpProvider.prototype.isConnected()==false){
    logger.error("Error occured while connecting to etherum");
          throw new Error('unable to connect to ethereum node at ' + ethereumUri);
  }else{
    logger.info("Successfully connected to etherum");
    res.send("connected");
       
  }
  
  });

  router.post('/createAccount', (req, res, next)=> {
 //web3.eth.personal.newAccount();
    res.send("return from createAccount");   
    });

    router.get('/getAccounts', (req, res, next)=> {
         res.send(JSON.stringify(web3.eth.accounts()));
         });


module.exports = router;