

const ganache = require('ganache-cli');

const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const{interface,bytecode} = require('../compile')
const assert = require('assert');



 let lottery;

beforeEach(  async()=>{


    accounts =  await web3.eth.getAccounts();


	lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode}).
    send({from:accounts[0],gas:'1000000'});


});


describe('lottery',()=>{


    it('deploy a contract',()=>{
	//console.log(helloworld);
    assert.ok(lottery.options.address);
});

it('allow one account to enter',async()=>{

    await lottery.methods.enter().send({
        from:accounts[0],
        value:web3.utils.toWei('0.02','ether')
    });

    const players = await lottery.methods.getPlayers().call();

    assert.equal(accounts[0],players[0]);
    assert.equal(1,players.length);

})

it('allow multiplu account to enter',async()=>{

    await lottery.methods.enter().send({
        from:accounts[0],
        value:web3.utils.toWei('0.02','ether')
    });


      await lottery.methods.enter().send({
        from:accounts[1],
        value:web3.utils.toWei('0.02','ether')
    });


      await lottery.methods.enter().send({
        from:accounts[2],
        value:web3.utils.toWei('0.02','ether')
    });

    const players = await lottery.methods.getPlayers().call();

    assert.equal(accounts[0],players[0]);
      assert.equal(accounts[1],players[1]);
       assert.equal(accounts[2],players[2]);
    assert.equal(3,players.length);

})

it('require mini amount of ether to enter',async()=>{



    try{

     await lottery.methods.enter().send({
        from:accounts[0],
        value:0
    });

     assert(false);

    }catch(err){

        assert(err);
    }






})
it('only manager can call pickWinner',async()=>{


    try{

   await lottery.methods.pickWinner().send({
        from :accounts[1]

    })
       assert(false);

    }catch(err){

        assert(err);
    }


})

it('only manager can call pickWinner',async()=>{


   await lottery.methods.enter().send({
        from:accounts[0],
        value:web3.utils.toWei('2','ether')
    });


   const inititalBalance = await web3.eth.getBalance(accounts[0]);



  await  lottery.methods.pickWinner().send({
        from :accounts[0]

    })

 const endBalance = await web3.eth.getBalance(accounts[0]);

const diffirent =  endBalance-inititalBalance;

assert(diffirent > web3.utils.toWei('1.8','ether'))



})



});
