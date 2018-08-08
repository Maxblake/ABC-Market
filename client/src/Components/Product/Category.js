import React,{Component} from 'react'
import { Grid, TextField, Paper, Typography } from '@material-ui/core';
import GridListComp from './GridListComp'


export default class Category extends Component{

    render(){
        return(
            <Grid container justify="center">
                <Grid item xs={12} sm={8}><br/>
                <Paper>
                    <Grid direction="row" justify="center">
                        <Grid item xs={12}>
                            <Grid container direction="row" justify="center">
                                    <Typography variant="display2">
                                    {this.props.match.params.category}
                                    </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                        <Grid direction="row" justify="center" >
                            <Grid item xs={12}>
                                <Grid container direction="row" justify="center">
                                <Grid item xs={10}>
                                        <TextField
                                        id="search"
                                        label="Search "
                                        fullWidth
                                        color="secondary"
                                        type="search"
                                        margin="normal"
                                        />
                                        </Grid>
                                </Grid>
                            </Grid>
                        
                        </Grid><br/><br/>

                        <Grid container direction="row" justify="center">
                            <Grid item xs={12} sm={10}>
                                <Grid container direction="row" justify="center">

                                    <Typography variant="display1">
                                        Search
                                    </Typography>
                                
                                </Grid>


                            </Grid>
                        
                        </Grid>


                        <Grid container direction="row" justify="center">
                            <Grid item xs={12} sm={10}>
                            <Grid container direction="row" justify="center">
                                <GridListComp type="product" products={this.props.products}/>
                                </Grid>
                            </Grid>
                        
                        </Grid><br/><br/><br/>

                        <Grid container direction="row" justify="center">
                            <Grid item xs={12} sm={10}>
                                <Grid container direction="row" justify="center">

                                    <Typography variant="display1">
                                       Latest
                                    </Typography>
                                
                                </Grid>


                            </Grid>
                        
                        </Grid>

                        <Grid container direction="row" justify="center">
                            <Grid item xs={12} sm={10}>
                            <Grid container direction="row" justify="center">
                                <GridListComp type="product" products={this.props.latest}/>
                                </Grid>
                            </Grid>                     
                        </Grid><br/>
                    </Paper>   
                </Grid>
            </Grid>
        )
    }
}