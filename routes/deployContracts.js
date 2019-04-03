var express = require('express');
var router = express.Router();
const fs = require("fs"),
      abiDecoder = require('abi-decoder'),
      Web3 = require('web3'),
      solc = require('solc');

//var Web3EthAccounts = require('web3-eth-accounts');
const log4js = require('log4js');
var obj = require("../public/setting.json");
var logger = log4js.getLogger('smartcontract');

const input = fs.readFileSync('contracts/vote.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':Token'].bytecode;
const abi = JSON.parse(output.contracts[':Token'].interface);
var web3 = new Web3(new Web3.providers.HttpProvider(obj.ethereumUri));

let Voting = new web3.eth.Contract(abi);
abiDecoder.addABI(abi);

module.exports=router;