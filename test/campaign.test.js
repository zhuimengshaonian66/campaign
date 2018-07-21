const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const compileFactory = require('../ethereum/build/CampaignFactory.json');
const compileCampain = require('../ethereum/build/Campaign.json');
require('events').EventEmitter.defaultMaxListeners = 30;


let accounts;
let factory;
let campainAddress;
let compaign;

beforeEach(async()=>{

  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode}).send({from:accounts[0],gas:'1000000'});
    await factory.methods.createCampain('100').send({from:accounts[0],gas:'1000000'});
  [campainAddress] = await  factory.methods.getDeployedCampain().call();
  compaign = await new web3.eth.Contract(JSON.parse(compileCampain.interface),campainAddress);
});

describe('Campain',()=>{

  it('deploy a factory and compain',()=>{
      assert.ok(factory.options.address);
          assert.ok(compaign.options.address);
  });

  it('marks callers as Campaign manager',async()=>{
      const manager = await compaign.methods.manager().call();
      assert.equal(manager,accounts[0]);
  });

  it('allow peopel to contribute',async()=>{
      await compaign.methods.contribute().send({
          value:'200',
          from:accounts[1]
      });

    const isContribute = await compaign.methods.approvers(accounts[1]).call();
      assert(isContribute);

  });

  it('require a minimum contribute',async()=>{
    try{
      await compaign.methods.contribute().send({
             value:'5',
             from:accounts[1]
         });
         const isContribute = await compaign.methods.approvers(accounts[1]).call();
           assert(isContribute);
    }catch(err){
      assert(err);
    }
  });


        it('allows a managee to make request',async()=>{
            await compaign.methods.createRequest('buy big','100',accounts[1]).send({
                from:accounts[0],
                gas:'1000000'
            });

            const request = await compaign.methods.requests(0).call();
            assert.equal('buy big',request.desctiption);
        });

        it('process requests',async()=>{
          await compaign.methods.contribute().send({
                 value:web3.utils.toWei('5','ether'),
                 from:accounts[0]
             });
             await compaign.methods.createRequest('buy big',web3.utils.toWei('5','ether'),accounts[1]).send({
                 from:accounts[0],
                 gas:'1000000'
             });
             await compaign.methods.approvalRequest(0).send({
                from:accounts[0],
                   gas:'1000000'
             });

            await    compaign.methods.finalizeRequest(0).send({
                    from:accounts[0],
                    gas:'1000000'
            });

            let balance = await web3.eth.getBalance(accounts[1]);
            balance = web3.utils.fromWei(balance,'ether');
            balance = parseFloat(balance);

            assert(balance >104);

        });


});
