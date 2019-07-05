 var express = require('express');
var router = express.Router();
const fs = require("fs"),
      Web3 = require('web3');

const log4js = require('log4js');
var obj = require("../public/setting.json");
var logger = log4js.getLogger('smartcontract');
var web3 = new Web3(new Web3.providers.HttpProvider(obj.ethereumUri));
const  solc  =  require('solc');




router.post('/deployContract', (req, res, next) => {

  console.log(req);
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
    
  //  console.log(output);
    
    var abi = output.contracts["./contracts/vote.sol"]['FoodSafe'].abi;
     var bytecode ='0x'+ output.contracts[["./contracts/vote.sol"]]['FoodSafe'].evm.bytecode.object;
     //console.log(bytecode);
     var HelloWorld = web3.eth.contract(abi);
    
     var food= HelloWorld.new(
       {
    from : req.body.accountAddress,
    data:bytecode,
    gas:'6800000'
    
       },function (err, contract){
         if(err)
         {
          res.status(err.status || 500).json({status: err.status, message: err.message})
          // console.log(err)
         }
         else{
if(contract.address==undefined || contract.address==null)
{
  setTimeout(function() {
		console.log("waiting for resonse")
	}, 100)
}
else{
  res.status(200).json({transactionHash : contract.transactionHash, contractAddress : contract.address})
}
         
          
     
    
         }
       });
    
  

});
  //console.log(food);
module.exports=router; 