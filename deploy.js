const HDWalletProvider = require('truffle-hdwallet-provider');


const Web3  = require('web3');

const {interface,bytecode} = require('./compile');


const provider = new HDWalletProvider(

    'type give repair twenty split notable humor sweet obey pizza click absurd',


    'https://rinkeby.infura.io/qu6DyHSMM99rz36rDG8A'


);

const web3 =  new Web3(provider);


const deploy =   async()=>{

const accounts = await web3.eth.getAccounts();

console.log('Attemp to deploy from accounts',accounts[0]);
console.log(interface);
const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:'0x'+bytecode})
            .send({from:accounts[0],gas:'1000000'});
            console.log('Contract deployed to',result.options.address);

}


deploy();
