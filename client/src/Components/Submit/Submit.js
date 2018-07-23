import React,{Component,Fragment} from 'react';
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import { withRouter } from 'react-router'
import SubmitProduct from "./SubmitProduct"
import SubmitSelect from "./SubmitSelect"
import SubmitVehicle from "./SubmitVehicle"
import SubmitService from "./SubmitService"
import SubmitSale from "./SubmitSale"
import SubmitPlace from "./SubmitPlace"


class Submit extends Component{

    typeSubmit=(type)=>{

            switch(type){
                
                case "product":
                    return(<SubmitSelect {...this.props}/>);
                    
                case "service":
                    return(<SubmitService {...this.props} />)
                
                case "place":
                    return(<SubmitPlace {...this.props} />)

                case "sale":
                    return(<SubmitSale {...this.props} />)

            }

    }
    

    render(){
            let returned = this.typeSubmit(this.props.match.params.type)
            console.log(returned)
        return (
             <Fragment>
                {returned}
            </Fragment>

        )
    }
}

export default withRouter(Submit)