
import React,{Component} from 'react';
import ProductDetail from './ProductDetail';
import ProductEdit from './ProductEdit';
import ContactDetail from './ContactDetail';
import {Collapse,Grid, Zoom} from '@material-ui/core'
import { newMessageFromProduct, getSeller } from './Request';
import { withRouter } from 'react-router';

class ProductPage extends Component{
   
    state={
        opened:true,
        contact:false,
        msg:false,
        editMode:false,
        seller: {}
    }
    
    contactSeller = id => {
        getSeller(id, seller => {
            if(seller != false) {
                this.setState({
                    contact:!this.state.contact,
                    seller
                })
            }
        })
    }

    messageToggle=()=>{
        this.setState({msg:!this.state.msg});
    }

    updateProduct= product => {
        this.setState({
            editMode:false,
            product
        })
    }
    
    handleEdit=()=>{
        this.setState({
            msg:false,
            contact:false,
            editMode:!this.state.editMode
        })
    }
    
    sendMessage = (message) => {
        const product_id = this.props.match.params.item
        const { name, person_id } = this.state.seller
        newMessageFromProduct(message, product_id, person_id, id => {
            if (id != null) {
                this.props.history.push({
                    pathname:`/inbox/${id}`,
                    state: { name }
                })
            }
        })
    }

    render(){
        return (
            <Zoom in={this.state.opened}>
                <Grid 
                    container
                    justify="center">
                    <Grid
                        item 
                        sm={8}>
                        <br/>
                        {this.state.editMode  ?
                        <ProductEdit  id={this.props.match.params.item} handleEdit={this.handleEdit} updateProduct={this.updateProduct}/>:
                        <ProductDetail id={this.props.match.params.item} handleEdit={this.handleEdit} contactSeller={this.contactSeller}/>}
                                
                        <Collapse in={this.state.contact}>
                            <ContactDetail 
                                msg={this.state.msg} 
                                sendMessage={this.sendMessage}
                                contact={this.state.contact}
                                messageToggle={this.messageToggle}
                                seller={this.state.seller}/>
                        </Collapse>
                    </Grid>
                </Grid>
            </Zoom>            
        )
    }
}

export default withRouter(ProductPage)