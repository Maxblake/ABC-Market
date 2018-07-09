import React,{Component} from 'react';
import ProductDetail from './ProductDetail';
import ProductEdit from './ProductEdit';
import ContactDetail from './ContactDetail';
import {Collapse,Grid, Zoom} from '@material-ui/core'

export default class ProductPage extends Component{
   
    state={
        opened:true,
        contact:false,
        msg:false,
        editMode:false,
        seller:{
            image:"carlos' image",
            name:"Carlos",
            lastName:"Di Matteo",
            username:"carlosdimatteo",
            code:"+58",
            phoneNumber:"04247751252",
            gender:"male",
            userType:"tourist",
            dateOfBirth:"29/08/1997",
            email:"carlosdima_97@hotmail.com"
        },

            product:{
                
                    image:"this is an image of the TV",
                    name:"Televisor 4k",
                    brand:"Samsung",
                    condition:"New",
                    price:3000,
                    description:"this is a fucking great TV"
                
            }
        }
    
    

    componentWillMount(){
        console.log(this.props)
    }
    contactSeller=()=>{
        this.setState({contact:!this.state.contact,
        msg:false});

    }
    messageToggle=()=>{
        console.log("toggle message tab")
        this.setState({msg:!this.state.msg});
    }
    updateProduct=(product)=>{
        this.setState({product:product,
        editMode:false});
        console.log("edit mode: "+this.state.editMode)

    }
    
    handleEdit=()=>{
        
        this.setState({msg:false,
        contact:false,
        editMode:!this.state.editMode});
        console.log("editMode :"+this.state.editMode)
    }
    
    
    
    
    render(){
        
        return (
            <Zoom in={this.state.opened}>
            <Grid container
            justify="center" >
            <Grid
             item 
             sm={8}
            >
            <br/>
            {this.state.editMode  ?
            
            <ProductEdit  handleEdit={this.handleEdit} product={this.state.product} updateProduct={this.updateProduct}/>:
            <ProductDetail handleEdit={this.handleEdit} contactSeller={this.contactSeller} product={this.state.product}/>}
                    
                   <Collapse in={this.state.contact}><ContactDetail msg={this.state.msg} sendMessage={this.sendMessage}contact={this.state.contact}messageToggle={this.messageToggle}seller={this.state.seller}/></Collapse>
                    
                    
                     
            </Grid>
            </Grid>
            </Zoom>
               
            
        )
    }
}
