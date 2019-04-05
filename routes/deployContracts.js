 var express = require('express');
var router = express.Router();
const fs = require("fs"),
     // abiDecoder = require('abi-decoder'),
      Web3 = require('web3');


//var Web3EthAccounts = require('web3-eth-accounts');
const log4js = require('log4js');
var obj = require("../public/setting.json");
var logger = log4js.getLogger('smartcontract');

const  solc  =  require('solc');
let source = fs.readFileSync("./contracts/vote.sol", 'utf8');
var solcInput = {
    language: "Solidity",
    sources: { 
        contract: {
            content: source
        }
     },
    settings: {
        optimizer: {
            enabled: true
        },
        evmVersion: "byzantium",
        outputSelection: {
            "*": {
              "": [
                "legacyAST",
                "ast"
              ],
              "*": [
                "abi",
                "evm.bytecode.object",
                "evm.bytecode.sourceMap",
                "evm.deployedBytecode.object",
                "evm.deployedBytecode.sourceMap",
                "evm.gasEstimates"
              ]
            },
        }
    }
};
console.log(solcInput);
solcInput = JSON.stringify(solcInput);
console.log(solcInput);

var contractObject = solc.compile(solcInput);
console.log(contractObject);
contractObject = JSON.parse(contractObject);

console.log(contractObject);

module.exports=router; 