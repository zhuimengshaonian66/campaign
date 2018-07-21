import React from 'react';
import factory from '../ethereum/factory';
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


    // async componentDidMount(){
    //
    //   const campaign = await factory.methods.getDeployedCampain().call();
    //   console.log(campaign);
    // }




    render(){

      return <div>{this.props.campaigns[0]}</div>;
    }
}

export default CompaignIndex;
