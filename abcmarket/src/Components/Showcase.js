import React,{Component} from 'react'
import GridListComp from './GridListComp'
import { Paper, Grid, Typography, Button, TextField } from '@material-ui/core';

export default class Showcase extends Component{

    state={
        places:["Aruba","Bonaire","Curacao","All"]
    }

    componentDidMount(){
        
    }

    render(){

        return(

            <Grid container justify="center">
                <Grid item xs={12} sm={8}>
                    <Paper>
                        <Grid container direction="row"
                        justify="center">

                            <Grid item xs={12} sm={12}>
                                <Grid container direction="row" justify="center">
                                <Typography  variant="display2">
                                    {this.props.showcase.title}
                                </Typography>
                                </Grid>
                            </Grid>
                        </Grid> 
                        <br/>
                        <br/>
                        <Grid container direction="row" justify="center"
                        spacing={24}
                        >
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

                                <Grid item xs={6}>
                                <Grid container direction="row" justify="center">
                                <Button variant="outlined">Watch</Button>
                                </Grid>
                                </Grid>
                                
                                <Grid item xs={6}>
                                <Grid container direction="row" justify="center">
                                <Button variant="outlined">Submit</Button>
                                </Grid >
                                </Grid>
                        </Grid>
                        <br/>
                        <br/>
                        <Grid container direction="row"
                        justify="center"
                        spacing={40}>
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
                        <br/>
                        <br/>
                        <Grid container direction="row"
                        justify="center"
                        spacing={24}>  {this.props.showcase.categories.map((category)=>(
                                   <Grid item xs={4}>
                                   <Grid container direction="row"
                                   justify="center">
                                    <Button variant="outlined">
                                       {category}
                                   </Button>
                                   
                                   </Grid>
                                   
                                   </Grid>
                                   
                               
                                ))}
                             
                        </Grid>
                        <br/>
                        <br/>
                        <Grid container direction="row"
                        justify="center">
                        <Typography variant="display1" >
                            Latest
                            </Typography>
                            </Grid>
                        <Grid container direction="row"
                        justify="center">

                            
                            
                            <Grid item xs={12} sm ={10}>
                            <Paper>
                            <GridListComp 
                            {...this.props}
                            type="product" products={this.props.showcase.latest} />
                            </Paper>
                                
                            </Grid>
                        </Grid>
                        <br/><br/>


                    </Paper>

                </Grid>
            
            </Grid>

        )
    }
}