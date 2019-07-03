var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const log4js = require('log4js');
var obj = require("../public/setting.json");
var logger = log4js.getLogger('smartcontract');
var web3 = new Web3(new Web3.providers.HttpProvider(obj.ethereumUri));

console.log(web3.eth.isMining(function (err,cb){

    if(err)
    {
        console.log(err);
    }
    else{
console.log("cb",cb)
    }
}));
// web3.miner.start()(req.body.password, function (err, cb) {
//     if (err) {
      
//      console.log(err)
//     }
//     else {
//     console.log(cb);
     
//     }
//   });

router.get('/startMiner', (req, res, next) => {
   

web3.miner.start()(req.body.password, function (err, cb) {
    if (err) {
      
     console.log(err)
    }
    else {
    console.log(cb);
     
    }
  });
  });

module.exports = router;