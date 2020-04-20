
const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx').Transaction;

const app = express();

const counterContract = require("./build/contracts/Counter.json")
//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("http://127.0.0.1:7545"));

app.get('/sendtx',function(req,res){

        var myAddress = '0x19F8e6b846b5f4a515CaCDaE06C0E90f5b952adC';
        var privateKey = Buffer.from('63ea6dda33a7fa084f2d3209af1e7b343e90b826fd97a67e35f64ed795978194', 'hex')

        //contract abi is the array that you can get from the ethereum wallet or etherscan
        var contractABI =counterContract.abi;
        var contractAddress ="0xa95F67D544481B422AA77C7FB5Bbad41544C98eF";
        //creating contract object
        var contract = new web3js.eth.Contract(contractABI,contractAddress);

        var count;
        // get transaction count, later will used as nonce
        web3js.eth.getTransactionCount(myAddress).then(function(v){
            console.log("Count: "+v);
            count = v;
            var amount = web3js.utils.toHex(1e16);
            //creating raw tranaction
            var rawTransaction = {
                "from":myAddress,
                "gasPrice":web3js.utils.toHex(20* 1e9),
                "gasLimit":web3js.utils.toHex(210000),
                "to":contractAddress,"value":"0x0",
                "data":contract.methods.increment().encodeABI(),
                "nonce":web3js.utils.toHex(count)
            }
            console.log(rawTransaction);
            //creating tranaction via ethereumjs-tx
            var transaction = new Tx(rawTransaction);
            //signing transaction with private key
            transaction.sign(privateKey);
            //sending transacton via web3js module
            web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
            .on('transactionHash',console.log);
            console.log("*************************")
            contract.methods.count().then((res) => {
                console.log("something", res)
            })
        })
    });
app.listen(3000, () => console.log('Example app listening on port 3000!'))
