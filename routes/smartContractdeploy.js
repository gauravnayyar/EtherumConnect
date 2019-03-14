var express = require('express');
var router = express.Router();
let fs = require("fs");
const Web3 = require('web3');

const log4js = require('log4js');
var obj = require("../public/Setting.json");

log4js.configure({
    appenders: { smartcontract: { type: 'file', filename: './logs/smartcontract.log' } },
    categories: { default: { appenders: ['smartcontract'], level: 'all' } }
  });
  
var logger = log4js.getLogger('smartcontract');

var ethAdapter = {};


/*
* connect to ethereum node
*/ 

 
const ethereumUri = obj.ethereumUri;
console.log(ethereumUri);
var web3 = new Web3(ethereumUri);
 web3.eth.net.isListening()
   .then(() => console.log('is connected'))
   .catch(e => console.log('Wow. Something went wrong'));

//web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'));
router.get('/', (req, res, next)=> {
  
  debugger
  if(web3.currentProvider.connected==false){
      throw new Error('unable to connect to ethereum node at ' + ethereumUri);
  }else{
   
      console.log('connected to ehterum node at ' + ethereumUri);
      let coinbase = web3.eth.coinbase;
      console.log('coinbase:' + coinbase);
    //  let balance = web3.eth.getBalance(coinbase);
    
      //let accounts = web3.eth.accounts;
      //console.log(accounts);
      res.send("connected")
  }
  
  });





module.exports = router;