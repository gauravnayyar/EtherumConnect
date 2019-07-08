
const {Miner} = require('web3-eth-miner');
var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const net = require('net');
const log4js = require('log4js');
var obj = require("../public/setting.json");
var logger = log4js.getLogger('smartcontract');
var web3 = new Web3(new Web3.providers.HttpProvider(obj.ethereumUri));

const provider = new Web3.providers.HttpProvider(obj.ethereumUri);

const miner = new Miner(provider,net);
//console.log(Miner);
//const miner =  new Miner(obj.ethereumUri);

// console.log(miner);

// Miner.startMining('0x1', function (err,cb)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log(cb);
//     }

// });



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

  router.post('/setEtherbase', (req, res, next) => {
   
    miner.setEtherbase(req.body.accountAddress, function (err,cb)
    {
        if (err) {
            console.log(err);
            logger.error(err);
            res.status(err.status || 500).json({status: err.status, message: err.message})
           // res.send("Wrong password Please try with correct one.");
          }
          else {
            if (cb == true) {
              logger.info(req.body.accountAddress + "   set Ethere base Successfully")
              res.send("Set EtherBase successfully");
            }
            else {
              logger.error(cb);
              res.status(err.status || 500).json({status: err.status, message: err.message})
            }
          }
    
      });
    });

 
module.exports = router;