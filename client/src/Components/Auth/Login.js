import React,{Component} from 'react';
import {Button} from '@material-ui/core';
import {Grid,TextField,Typography} from '@material-ui/core'
import { withRouter } from 'react-router';

class Login extends Component{
    state = {
        username: "",
        password: ""
    }    

    handleChange = (event) => {
        this.setState({ [event.target.name]:event.target.value })
    }

    logIn = () => {
        const { username, password } = this.state
        console.log(username ,password)
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 200) {
                this.props.history.push('/home')
                this.props.logIn(data.user)
            }
            console.log(data)
        })
    }
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
          name="username"
          label="Email"
          margin="normal"
          onChange={this.handleChange} 
         />
        <br/>
            </Grid>
            <Grid item xs={12}>
            <TextField
          type="password"
          id="password"
          name="password"
          label="Password"
          margin="normal"
          onChange={this.handleChange} 
        />
            </Grid>
            <br/>
            <Grid item xs={12}>
            <Button color="secondary"variant="raised" onClick={this.logIn}>Log In</Button>
            </Grid>
            </Grid>
            </form>
        )
    }
}

export default withRouter(Login)
