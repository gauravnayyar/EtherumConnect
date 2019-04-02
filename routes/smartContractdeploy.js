var express = require('express');
var router = express.Router();
let fs = require("fs");
const Web3 = require('web3');
const net = require('net');



 //var web3 =new Web3();
const log4js = require('log4js');
var obj = require("../public/setting.json");

// log4js.configure({
//     appenders: { smartcontract: { type: 'file', filename: './logs/smartcontract.log' } },
//     categories: { default: { appenders: ['smartcontract'], level: 'all' } }
//   });
  
var logger = log4js.getLogger('smartcontract');
var web3 = new Web3(obj.ethereumUri);

console.log(web3.providers.HttpProvider.prototype.isConnected());
  
/*
* connect to ethereum node
*/ 





router.get('/', (req, res, next)=> {
  
  debugger
  if(web3.providers.HttpProvider.prototype.isConnected()==false){
    logger.error("Error occured while connecting to etherum");
          throw new Error('unable to connect to ethereum node at ' + ethereumUri);
  }else{
    logger.info("Successfully connected to etherum");
    res.send("connected");
       
  }
  
  });





module.exports = router;