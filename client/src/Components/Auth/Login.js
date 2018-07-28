import React,{Component} from 'react';
import {Button} from '@material-ui/core';
import {Grid,TextField,Typography} from '@material-ui/core'
import { withRouter } from 'react-router';
import { Session } from '../../Provider/Auth'

class Login extends Component{
    state = {
        username: "",
        password: ""
    }    

    handleChange = (event) => {
        this.setState({ [event.target.name]:event.target.value })
    }

    render(){
        const { username, password } = this.state
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
                            <Session.Consumer>
                                {session => (
                                    <Button 
                                        color="secondary"
                                        variant="raised" 
                                        onClick={() => session.setSession(username, password)}>
                                        Log In
                                    </Button>
                                )}
                            </Session.Consumer>
                        </Grid>
                    </Grid>
                </form>
            )
    }
}

export default withRouter(Login)
