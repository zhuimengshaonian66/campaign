import React from 'react';
import factory from '../ethereum/factory';

import {Card} from 'semantic-ui-react';
// export default ()=>{
//
// return <h1>this is new page</h1>;
//
// };

class CompaignIndex extends  React.Component{

    static async getInitialProps(){
          const campaigns = await factory.methods.getDeployedCampain().call();
          return {campaigns};
    }

    //
    // async componentDidMount(){
    //   const campaign = await factory.methods.getDeployedCampain().call();
    //   console.log(campaign);
    // }


renderCampains(){
  const items = this.props.campaigns.map(address=>{
      return{
          header:address,
          description:<a>查看众筹</a>,
          fluid:true
      }
  });
return <Card.Group items={items}/>;

}

    render(){
      return <div>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
      {this.renderCampains()}
      </div>;
    }
}

export default CompaignIndex;
