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
    logger.info("Successfully connected to ethereum");
    res.send("connected");

  }

});

router.post('/createAccount', (req, res, next) => {
  web3.personal.newAccount(req.body.password, function (err, cb) {
    if (err) {
      logger.error(err);
      res.status(err.status || 500).json({status: err.status, message: err.message})
    }
    else {
      logger.info("Account Create Succsfully");
      res.send(cb);
    }
  });
});

router.post('/unlockAccount', (req, res, next) => {

  web3.personal.unlockAccount(req.body.accountAddress, req.body.password, 600, function (err, cb) {
    if (err) {
      console.log(err);
      logger.error(err);
      res.status(err.status || 500).json({status: err.status, message: err.message})
     // res.send("Wrong password Please try with correct one.");
    }
    else {
      if (cb == true) {
        logger.info(req.body.accountAddress + "   unlock Successfully")
        res.send("Unlocked successfully");
      }
      else {
        logger.error(cb);
        res.status(err.status || 500).json({status: err.status, message: err.message})
      }
    }
  })
});



router.get('/listAccounts', (req, res, next) => {
  web3.personal.getListAccounts(function (err, cb) {
    if (err) {
      logger.error(err);

      res.status(err.status || 500).json({status: err.status, message: err.message})
    }
    else {
      res.send(cb);
    }
  });
});

router.post('/lockAccount', (req, res, next) => {
  web3.personal.lockAccount(req.body.accountAddress,function (err, cb) {
    if (err) {
      logger.error(err);

      res.status(err.status || 500).json({status: err.status, message: err.message})
    }
    else {
      logger.info(cb);
      res.send(cb);
    }
  });
});

router.post('/sign', (req, res, next) => {
  
  let hexmsg=Buffer.from(req.body.message, 'utf8').toString('hex');
  console.log(hexmsg);
hexmsg='0x'+hexmsg;
  web3.personal.sign(hexmsg,req.body.accountAddress,req.body.password,function (err, cb) {
    if (err) {
      logger.error(err);

      res.status(err.status || 500).json({status: err.status, message: err.message})
    }
    else {
      logger.info(cb);
      res.send(cb);
    }
  });
});
router.post('/ecRecover', (req, res, next) => {
  
  let hexmsg=Buffer.from(req.body.message, 'utf8').toString('hex');
  console.log(hexmsg);
   hexmsg='0x'+hexmsg;
  web3.personal.ecRecover(hexmsg,req.body.signature,function (err, cb) {
    if (err) {
      logger.error(err);

      res.status(err.status || 500).json({status: err.status, message: err.message})
    }
    else {
      logger.info(cb);
      res.send(cb);
    }
  });
});
router.post('/importRawKey', (req, res, next) => {
  
  let hexKey= Buffer.from(req.body.privateKey, 'utf8').toString('hex');
  console.log(hexKey)
  web3.personal.importRawKey(hexKey,req.body.password,function (err, cb) {
    if (err) {
      logger.error(err.Error);

res.write(err.status);
      //res.status(err.status).json({status: err.status, message: err.message})
    }
    else {
      logger.info(cb);
      res.send(cb);
    }
    res.end();
  });
});
router.post('/sendTransaction', (req, res, next) => {
  var tx = {from: req.body.fromAccount, to: req.body.toAccount, value: web3.toWei(req.body.etherAmount, "ether")}
  
  web3.personal.sendTransaction(tx,req.body.password ,function(err,cb){
    if (err) {
      logger.error(err);

      res.status(err.status || 500).json({status: err.status, message: err.message})
    }
    else {
      logger.info(cb);
      res.send(cb);
    }
  });
});



module.exports = router;