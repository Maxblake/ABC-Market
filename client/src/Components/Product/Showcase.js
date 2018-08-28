import React,{Component} from 'react'
import GridListComp from './GridListComp'
import { Paper, Grid, Typography, Button, TextField } from '@material-ui/core';
import Link from 'react-router-dom/Link';

export default class Showcase extends Component{

    state={
        places:["Aruba","Bonaire","Curacao","All"]
    }

    render(){
        return(
            <Grid container justify="center">
                <Grid item xs={12} sm={8}>
                    <Paper>
                        <Grid container direction="row" justify="center">
                            <Grid item xs={12} sm={12}>
                                <Grid container direction="row" justify="center">
                                <Typography  variant="display2">
                                    {/* {this.props.showcase.title} */}
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid> 
                        <br/>
                        <br/>
                        <Grid container direction="row" justify="center" spacing={24}>
                            {this.state.places.map((place)=>(
                                <Grid item xs={3}key={place}>
                                    <Grid container direction="row" justify="center">
                                        <Button variant="outlined">{place}</Button>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <br/>
                        <br/>
                        <Grid container direction="row"
                        justify="center"
                        spacing={40}>  
                            <Grid item xs={5}>
                                <Grid container direction="row" justify="center">
                                    <Button 
                                        component={Link}
                                        to={`${this.props.location.pathname}/all`}
                                        fullWidth
                                        variant="outlined">
                                    Watch
                                    </Button>
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={5}>
                                <Grid container direction="row" justify="center">
                                    <Button 
                                        fullWidth
                                        component={Link}
                                        to={`/submit/${this.props.match.params.type.replace(/s$/,"")}`}
                                        variant="outlined">
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Grid 
                            container 
                            direction="row"
                            justify="center"
                            spacing={24}>  
                            {this.props.showcase.categories.map((category,index)=>(
                                <Grid item key={ index } xs={4}>
                                   <Grid 
                                        container
                                        direction="row"
                                        justify="center">
                                        <Button 
                                            component={Link}
                                            to={`${this.props.location.pathname}/${category}`}
                                            variant="outlined">
                                            {category}
                                        </Button>
                                   </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <br/>
                        <br/>
                        <Grid 
                            container 
                            direction="row"
                            justify="center">
                            <Typography 
                                variant="display1" >
                                Latest
                            </Typography>
                        </Grid>
                        <Grid 
                            container 
                            direction="row"
                            justify="center">
                            <Grid item xs={12} sm ={10}>
                                <Paper>
                                    <GridListComp />
                                </Paper>        
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}