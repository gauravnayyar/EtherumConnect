var express = require('express');
var router = express.Router();
const fs = require("fs"),
      Web3 = require('web3');

const log4js = require('log4js');
var obj = require("../public/setting.json");
var logger = log4js.getLogger('smartcontract');
var web3 = new Web3(new Web3.providers.HttpProvider(obj.ethereumUri));

// in this we have to write other eth methos only.

module.exports=router; 