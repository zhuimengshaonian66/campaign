import web3  from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x1DE95936005082d9467B802cd041BEC87e21d041'
)


export default instance;
