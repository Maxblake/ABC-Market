import React,{Component} from 'react';
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import {Link} from 'react-router-dom'



export default class ContactButton extends Component{


    render(){

        return (

            
                <Grid item xs={12} >
                <Paper>
                    <Grid container direction="row"
                    >
                        <Grid item xs={3}>
                        {/* image */}
                            <Typography>
                                {this.props.product.image}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                        {Object.keys(this.props.product).map((key)=>(
                            key!=="description" ?
                            <Typography 
                            key={key}
                            variant="subheading">
                            {key}:{ this.props.product[key]}
                            </Typography>:null
                                
                            ))}
                        </Grid>
                        <Grid item xs={3}>
                        {this.props.edit ? 
                            <Button variant="outlined"
                            color="secondary"
                            
                            >
                            Edit
                            </Button>:<Button
                            variant="outlined"
                            color="Secondary"
                            component={Link}
                            to={`/details/${this.props.product.name}
`}
                            >
                                View
                            </Button>}
                        </Grid>
                    </Grid>
                </Paper>
                </Grid>

        )
    }
}