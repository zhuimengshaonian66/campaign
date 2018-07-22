import React from 'react';
import factory from '../ethereum/factory';

import {Card,Button} from 'semantic-ui-react';
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
      return (
      <div>
      <h3>众筹列表</h3>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
      {this.renderCampains()}
      <Button content="创建众筹"  icon="add circle"  primary/>

      </div>

    );
    }
}

export default CompaignIndex;
