 var express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require("fs"),
      Web3 = require('web3');
     
const log4js = require('log4js');
var obj = require("../public/setting.json");
var logger = log4js.getLogger('smartcontract');
var web3 = new Web3(new Web3.providers.HttpProvider(obj.ethereumUri));
const  solc  =  require('solc');
//const app = express();
router.use(fileUpload());
router.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

router.post('/deployContract', (req, res, next) => {

  console.log(req);
    var content = fs.readFileSync("./contracts/demo.sol").toString();
    var input = {
      language: 'Solidity',
      sources: {
        ["./contracts/demo.sol"]: {
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
    
    var abi = output.contracts["./contracts/demo.sol"]['SimpleStorage'].abi;
     var bytecode ='0x'+ output.contracts[["./contracts/demo.sol"]]['SimpleStorage'].evm.bytecode.object;
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



router.post('/method' , (req,res,next) =>
{
  var content = fs.readFileSync("./contracts/demo.sol").toString();
    var input = {
      language: 'Solidity',
      sources: {
        ["./contracts/demo.sol"]: {
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
    
    var abi = output.contracts["./contracts/demo.sol"]['SimpleStorage'].abi;
    var contract = web3.eth.contract(abi).at("0xe8664f3401e8da87d84fc42ea4def263beed687c");
    contract.set.sendTransaction(2,{
      from:web3.eth.accounts[0],
      gas:6800000},function (error, result){ //get callback from function which is your transaction key
          if(!error){
              console.log(result);
              res.send(result);
          } else{
              console.log(error);
              res.send(error);
          }
          
  });
})
module.exports=router; 
