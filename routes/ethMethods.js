var express = require('express');
var router = express.Router();
const fs = require("fs"),
      Web3 = require('web3');

const log4js = require('log4js');
var obj = require("../public/setting.json");
var logger = log4js.getLogger('smartcontract');
var web3 = new Web3(new Web3.providers.HttpProvider(obj.ethereumUri));

router.post('/getTransaction', (req, res, next) => {
    web3.eth.getTransaction(req.body.trnsactionHash,(err,cb)=>{
        if(err)
        {
            res.status(err.status || 500).json({status: err.status, message: err.message})
        }
        else{
            res.send(cb);
        }

    })

});
router.post('/getTransactionList', (req, res, next) => {
   var result=getTransactionsByAccount(req.body.accountAddress,1,null);
   res.send(result);
    });

    function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
        if (endBlockNumber == null) {
          endBlockNumber = web3.eth.blockNumber;
          console.log("Using endBlockNumber: " + endBlockNumber);
        }
        if (startBlockNumber == null) {
          startBlockNumber = endBlockNumber - 1000;
          console.log("Using startBlockNumber: " + startBlockNumber);
        }
        console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
      
        for (var i = startBlockNumber; i <= endBlockNumber; i++) {
          if (i % 1000 == 0) {
            console.log("Searching block " + i);
          }
          var block = web3.eth.getBlock(i, true);
          if (block != null && block.transactions != null) {
            block.transactions.forEach( function(e) {
              if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
                console.log("  tx hash          : " + e.hash + "\n"
                  + "   nonce           : " + e.nonce + "\n"
                  + "   blockHash       : " + e.blockHash + "\n"
                  + "   blockNumber     : " + e.blockNumber + "\n"
                  + "   transactionIndex: " + e.transactionIndex + "\n"
                  + "   from            : " + e.from + "\n" 
                  + "   to              : " + e.to + "\n"
                  + "   value           : " + e.value + "\n"
                  + "   time            : "+block.timestamp +" "+new Date(block.timestamp * 1000).toGMTString() + "\n"
                  + "   gasPrice        : " + e.gasPrice + "\n"
                  + "   gas             : " + e.gas + "\n"
                  + "   input           : " + e.input);
              }
            })
          }
        }
      }


      function checkTransactionCount(startBlockNumber, endBlockNumber) {
        console.log("Searching for non-zero transaction counts between blocks "  + startBlockNumber + " and " + endBlockNumber);
      
        for (var i = startBlockNumber; i <= endBlockNumber; i++) {
          var block = web3.eth.getBlock(i);
          if (block != null) {
            if (block.transactions != null && block.transactions.length != 0) {
              console.log("Block #" + i + " has " + block.transactions.length + " transactions")
            }
          }
        }
      }
module.exports=router; 