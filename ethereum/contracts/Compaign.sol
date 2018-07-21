pragma solidity ^0.4.19;



//众筹工厂
contract CampaignFactory{

//管理中筹的地址的数组
address[] public deployedCampain;

function createCampain(uint mininum) public {

  address newCampain = new Campaign(mininum,msg.sender);
  deployedCampain.push(newCampain);

}

//拿到列表
function getDeployedCampain() public view returns(address[])
{
  return deployedCampain;
}

}


contract Campaign{

    struct Request{ //请求
        string desctiption;//描述
        uint value;//申请金额
        address recipient;//受益人地址
        bool compelete;//是否完成
        uint approvesCounts;//同意的人数
        mapping(address=>bool) approvers;//记录同意的人
    }

    Request[] public requests;//存储了所有的请求
    address public manager;//总凑的发起人
    uint public minimumContribute;//最小的贡献
    mapping(address=>bool) public approvers; //记录贡献者
    uint public approvesCounts;//贡献者的数量

modifier restricted() { //限制只能为合约的发起人
    require(manager==msg.sender);
    _;
}


    constructor(uint minimum,address creator) public//构造函数
    {
        manager=creator;
        minimumContribute = minimum;
    }

    function contribute() public payable{  //贡献函数

        require (msg.value > minimumContribute);
        approvers[msg.sender] = true;
        approvesCounts++;
    }

    function createRequest(string desctiption,uint value,address recipient) public restricted{//合约发起人创建请求

    Request memory newQuest = Request({
    desctiption:desctiption,
    value:value,
    recipient:recipient,
    compelete:false,
    approvesCounts:0
    });
    requests.push(newQuest);

    }

function approvalRequest(uint index) public{   //同意请求
    Request storage request = requests[index];

    require (approvers[msg.sender]);

    require (!request.approvers[msg.sender]);

request.approvers[msg.sender] = true;

request.approvesCounts++;

}



function finalizeRequest(uint index) public restricted payable{//完成请求
    Request storage request = requests[index];
    require(request.approvesCounts >approvesCounts/2);
    request.recipient.transfer(request.value);

    request.compelete = true;

}


function getSummary() public view returns(uint ,uint ,uint ,uint ,address){//获取全局属性
  return(minimumContribute,address(this).balance,requests.length,approvesCounts,manager);
}

function getRequestCount() public view returns(uint){ //获取长度

  return requests.length;

}























}
