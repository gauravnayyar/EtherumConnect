 var express = require('express');
var router = express.Router();
const fs = require("fs"),
      Web3 = require('web3');

const log4js = require('log4js');
var obj = require("../public/setting.json");
var logger = log4js.getLogger('smartcontract');
var web3 = new Web3(new Web3.providers.HttpProvider(obj.ethereumUri));
const  solc  =  require('solc');

var content = fs.readFileSync("./contracts/vote.sol").toString();
var input = {
  language: 'Solidity',
  sources: {
    ["./contracts/vote.sol"]: {
      content: content
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}

var compiled = solc.compile(JSON.stringify(input));
var output = JSON.parse(compiled);
var abi = output.contracts["./contracts/vote.sol"]['FoodSafe'].abi;
 var bytecode ='0x'+ output.contracts[["./contracts/vote.sol"]]['FoodSafe'].evm.bytecode.object;
 //console.log(bytecode);
 var HelloWorld = web3.eth.contract(abi);

//  var food= HelloWorld.new(
//    {
// from : "0x3c558787478d4a4ff38c7765f45eccd7a5396878",
// data:bytecode,
// gas:'21000'

//    },function (err, contract){
//      if(err)
//      {
//        console.log(err)
//      }
//      else{

     
//     console.log(contract);
//      }
//    });
//   console.log(food);
 
//console.log(food);
module.exports=router; 