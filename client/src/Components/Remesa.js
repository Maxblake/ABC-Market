import React,{Component} from 'react';
import {Button, Grid,Zoom, Paper, Typography,TextField} from '@material-ui/core';
// import {handleChange} from '../../../Helpers/Helpers'
export default class Remesa extends Component{
    state={
        opened:true,
        admin:false,
        rate:1000,
        florines:0,
        bolivares:0
    }
    // componentDidMount(){
    //     this.state.opened=true
    // }
    currencyChange = ({target:{value}}) => {
        let bs = value/1.8*this.state.rate
        this.setState({bolivares:bs})
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
            <Paper>
            <Grid container direction="row" justify="center">
            <Typography variant="display2">
                Remesas
            </Typography>
                <br/><br/><br/><br/>
            
            </Grid>
            <Grid container direction="row" justify="center">
            {this.state.admin ? <TextField
                    id="rate"
                    name="rate"
                    label="Rate"
                    margin="normal"
                    type="number" InputProps={{ inputProps: { min: 0, max: 1000000 } }}
                    value={this.state.rate}
                    onChange={handleChange} 
                 /> : <Typography variant="headline">
                 Rate : {this.state.rate}</Typography>
                }
            </Grid>
            <Grid container direction="row" justify="center" spacing={40}>
            <Grid item xs={6} sm={6}>
            <Grid container direction="row" justify="center">
            <TextField
                    id="florines"
                    name="florines"
                    label="Florines"
                    margin="normal"
                    type="number" InputProps={{ inputProps: { min: 0, max: 1000000 } }}
                    onChange={this.currencyChange} 
                 />
            </Grid>
            
            </Grid>
            <Grid item xs={6} sm={6}>
            <Grid container direction="row" justify="center">
            <TextField
                    disabled
                    id="bolivares"
                    name="bolivares"
                    label="Bolivares"
                    margin="normal"
                    type="number" InputProps={{ inputProps: { min: 0, max: 1000000 } }}
                    value={this.state.bolivares}
                    onChange={handleChange} 
                 />
            </Grid>
            
            </Grid>


            </Grid>
            <Grid container direction="row" justify="center" >
            <Typography variant="subheading">+297-0000-000</Typography>
            </Grid>
            <br/><br/>
           
            
                
            </Paper>     
            </Grid>
            </Grid>
            
            </Zoom>
        )
    }
}