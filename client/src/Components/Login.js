import React,{Component} from 'react';
import {Button} from '@material-ui/core';
import {Grid,TextField,Typography} from '@material-ui/core'
export default class Login extends Component{

    render(){
        return (
            <form >
            <Grid container
            direction="column"
            alignItems="center"
            justiy="center"
            >
            <Grid item><br/>
            <Typography variant="display2">
                Login
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <TextField
          id="name"
          label="Username"
          margin="normal"
        />
        <br/>
            </Grid>
            <Grid item xs={12}>
            <TextField
          type="password"
          id="password"
          label="Password"
          margin="normal"
        />
            </Grid>
            <br/>
            <Grid item xs={12}>
            <Button color="secondary"variant="raised" >Log In</Button>
            </Grid>
            </Grid>
            </form>
        )
    }
}