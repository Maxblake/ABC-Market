import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Grid, TextField, Typography } from "@material-ui/core";
import { withRouter } from "react-router";
import { Session } from "../../Provider/Auth";
// import { this.handleChange } from "../../Helpers";
class Login extends Component {
    state = {
        values : {
            username: "",
            password: "",
        },
        error :{
            username: null,
            password: null
        }
    };

    handleChange = element => {
        let error = {...this.state.error}
        let values = {...this.state.values}
        
        if (element.target.value == '') {
          error[element.target.name] = true
        } else {
          error[element.target.name] = false
        }
        values[element.target.name] = element.target.value
        this.setState({ error, values })
    }

    checkInput = () => {
        let error = { ...this.state.error }
        Object.keys(error).map(err => {
            (error[err] == null) ? 
            this.setState(prevState => ({
                 error: { 
                    ...prevState.error,
                    [err]:true 
                }  
            }))
            : null
        })
    }

    render() {
        const { values, error } = this.state;
        return (
        <form>
            <Grid container direction="column" alignItems="center" justify="center">
            <Grid item>
                <br />
                <Typography variant="display2">Login</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                id="name"
                name="username"
                label="Username"
                margin="normal"
                error={error.username}
                helperText={(error.username ? 'Username cannot be blank' : '')}
                onChange={this.handleChange}
                />
                <br />
            </Grid>
            <Grid item xs={12}>
                <TextField
                type="password"
                id="password"
                name="password"
                label="Password"
                margin="normal"
                error={error.password}
                helperText={(error.password ? 'Password cannot be blank' : '')}
                onChange={this.handleChange}
                />
            </Grid>
            <br />
            <Grid item xs={12}>
                <Session.Consumer>
                {session => (
                    <Button
                    color="secondary"
                    variant="raised"
                    onClick={() => {this.checkInput(); session.setSession(values)}}
                    >
                    Log In
                    </Button>
                )}
                </Session.Consumer>
            </Grid>
            </Grid>
        </form>
        );
    }
}

export default withRouter(Login);
