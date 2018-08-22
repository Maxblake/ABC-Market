import React,{Component} from 'react';
import {Button,Grid,Icon,Typography,Paper} from '@material-ui/core'
import ImageViewer from './ImageViewer';
import { productDetail } from './Request';
import LocationContainer from '../Map/LocationContainer';

export default class ProductDetail extends Component{

    state = {
        product: { },
        loaded: false,
    }

    componentDidMount() {
        productDetail(this.props.id, product => {
            if (product != null) {
                this.setState({ product })
                setTimeout(() => this.setState({ loaded: true }), 500)
            }
        })
    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render(){
        const { product } = this.state
        
        return (
            <Paper>
                <Grid 
                    container 
                    direction="row"
                    alignItems="center"
                    justify="center">
                    <Grid item sm={6} xs={12}>
                        <ImageViewer id={this.props.id}/>
                    </Grid>
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
                        {  
                            (this.state.loaded == true) ?
                                Object.keys(product.general).map((prod, i) => {
                                    return (
                                        <Typography key={i} variant="display1">
                                            {(prod == 'title' && product.general[prod] != null) ?
                                                product.general[prod]
                                                : null
                                            }
                                        </Typography>
                                    )
                                })
                            : null 
                        }
                        { 
                            (this.state.loaded == true) ?
                                Object.keys(product.type).map((prod, i) => { 
                                    console.log(i)                                   
                                    return (
                                        <Typography key={i} variant="headline">
                                            {
                                                (prod != `${product.general.type}_id`) ?
                                                (prod != 'post_time') ?
                                                (prod == 'address') ? <LocationContainer />  :
                                                (product.type[prod] == true) ? `${this.Capitalize(prod)}: Yes` :
                                                (product.type[prod] == false) ? `${this.Capitalize(prod)}: No` : 
                                                `${this.Capitalize(prod)}: ${product.type[prod]}` 
                                                : null : null
                                            }
                                        </Typography>
                                    )
                                })
                            : null 
                        }
                        <Button variant="raised" color="secondary" onClick={() => this.props.contactSeller(product.general.person_id)}>Contact Seller</Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="title">
                        Product description : 
                    </Typography>{console.log(this.state.loaded)}
                    {  (this.state.loaded == true) ?
                        <Typography variant="body2">
                            {product.general.description}
                        </Typography>
                        : null
                    }
                </Grid>
                <br/>
            </Paper>
        )
    }
}