import React,{Component} from 'react';
import {Button} from '@material-ui/core';
import {Grid,TextField} from '@material-ui/core'

export default class Login extends Component{
    state = {
        username: "",
        password: ""
    }    

    handleChange = (event) => {
        this.setState({ [event.target.name]:event.target.value })
    }

    logIn = () => {
        const { username, password } = this.state
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
            console.log(data)
        })
    }

    render(){
        return (
            <form >
                <Grid container
                direction="column"
                alignItems="center"
                justiy="center">
                    <Grid item>
                       <h1>Login</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth
                            id="username"
                            label="Name"
                            margin="normal"
                            name="username"
                            onChange={this.handleChange} 
                        />
                    <br/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField fullWidth
                        type="password"
                        id="password"
                        label="Password"
                        margin="normal"
                        name="password"
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <br/>
                    <Grid item xs={12}>
                        <Button color="secondary" variant="raised" onClick={this.logIn}>Log In</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}