import React,{Component} from 'react';
import { Grid, Typography, Paper, Button, Avatar } from '@material-ui/core';
import {Link} from 'react-router-dom'

const ProductDisplay = (props) => {
    const { image, product_id } = props.product
    return (        
        <Grid item xs={12} >
            <Paper>
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <Avatar src={image}>
                        </Avatar>
                    </Grid>
                    <Grid item xs={5}>
                        {Object.keys(props.product).map(key => (
                            key !== "image" ?
                            key !== "product_id" ?
                                <Typography 
                                    key={key}
                                    variant="subheading">
                                    {props.product[key]}
                                </Typography>
                            : null : null
                        ))}
                    </Grid>
                    <Grid item xs={3}>
                    {props.edit ? 
                        <Button 
                            variant="outlined"
                            color="secondary" >
                        Edit
                        </Button> : 
                        <Button
                            variant="outlined"
                            color="secondary"
                            component={Link}
                            to={`/details/${product_id}`}
                                >
                        View
                        </Button>
                    }
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default ProductDisplay