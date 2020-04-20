const Web3 = require('web3');
// connect to any peer; using infura here
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const decryptedAccount = web3.eth.accounts.privateKeyToAccount('63ea6dda33a7fa084f2d3209af1e7b343e90b826fd97a67e35f64ed795978194');
const myAddress = '0x19F8e6b846b5f4a515CaCDaE06C0E90f5b952adC'
const contractAddress = '0x05c6a24D561e79d7e52b491745d7A5b3e69c09B3'

const counterContract = require("./build/contracts/Counter.json")
var contract = new web3.eth.Contract(counterContract.abi,contractAddress);

web3.eth.getTransactionCount(myAddress).then(function(v){
  var count = v;
  var rawTransaction = {
    "from":myAddress,
    "gasPrice":web3.utils.toHex(20* 1e9),
    "gasLimit":web3.utils.toHex(210000),
    "to":contractAddress,
    "value":"0x0",
    "data":contract.methods.increment().encodeABI(),
    "nonce":web3.utils.toHex(count)
  }
  decryptedAccount.signTransaction(rawTransaction)
    .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
    .then(receipt => console.log("Transaction receipt: ", receipt))
    .catch(err => console.error(err));
  contract.methods.count().call((error, result) => {
    if (!error) {
      console.log(result);
      console.log(result);
    }
  }); // 
})
// Or sign using private key from decrypted keystore file
/*
web3.eth.accounts.signTransaction(rawTransaction, decryptedAccount.privateKey)
  .then(console.log);
*/