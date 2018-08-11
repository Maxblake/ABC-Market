import React,{Component} from 'react';
import {Button,Grid,Icon,Typography,Paper} from '@material-ui/core'
import ImageViewer from './ImageViewer';
import { productDetail } from './Request';


export default class ProductDetail extends Component{
    
    componentDidMount() {
        // productDetail()
    }

    render(){
        return (
            <Paper>
                <Grid container 
                    direction="row"
                    alignItems="center"
                    justify="center">


                    <ImageViewer id={this.props.id}/>



                    <Grid item xs={12} sm={6}>
                        <Grid container 
                            direction="row"
                            justify="flex-end">
                            <Button 
                                mini 
                                variant="fab" 
                                color="secondary" 
                                onClick={this.props.handleEdit}>
                                <Icon>edit_icon</Icon>
                            </Button>
                        </Grid>
                        <Typography variant="display1">
                            Product Name:{this.props.product.name}
                        </Typography>
                        <Typography variant="headline">
                            Brand:{this.props.product.brand}
                        </Typography>
                        <Typography variant="title">
                            Condition: {this.props.product.condition}
                        </Typography>
                        {this.props.product.price ?
                            <Typography variant="subheading">
                                Price : {this.props.product.price} $
                            </Typography> 
                        : null}
                        <Button variant="raised" color="secondary" onClick={this.props.contactSeller}>Contact Seller</Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="title">
                        Product Description : 
                    </Typography>
                    <Typography variant="body2">
                        {this.props.product.description}
                    </Typography>
                </Grid>
                <br/>
            </Paper>
        )
    }
}