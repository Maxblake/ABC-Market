import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Grid, Radio, TextField, FormControl, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Select, MenuItem, InputLabel, Input, Paper } from "@material-ui/core";
import { Session } from "../../Provider/Auth";
// import { checkErrors } from "../../Helpers/";

export default class Register extends Component {
    state = {
        values: {
            name: '',
            lastname: '',
            username: '',
            code: '',
            phoneNumber: '',
            password: '',
            gender: '',
            type: '',
            birthDate: '',
            address: '',
        },
        error: {
            name: null,
            lastname: null,
            username: null,
            code: null,
            phoneNumber: null,
            password: null,
            gender: null,
            type: null,
            birthDate: null,
            address: null,
            confirm_password:null
        }
    }
    
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
            <Grid container>
            <Grid container direction="row" justify="center">
                <h1>Register</h1>
            </Grid>
            <Grid container direction="row" justify="center" spacing={0}>
                <Grid item xs={12} sm={3}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={8}>
                    <TextField
                        fullWidth
                        label="Name"
                        margin="normal"
                        name="name"
                        error={error.name}
                        helperText={(error.name ? 'Name cannot be blank' : '')} 
                        onChange={this.handleChange}
                        />
                    <br />
                    <TextField
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        margin="normal"
                        name="lastname"
                        error={error.lastname}
                        helperText={(error.lastname ? 'Lastname cannot be blank' : '')} 
                        onChange={this.handleChange}
                    />
                    <br />
                    <FormControl>
                        <InputLabel>Code</InputLabel>
                        <Select
                        value={values.code}
                        error={error.code}
                        onChange={this.handleChange}
                        input={<Input name="code" />}
                        >
                        <MenuItem value={"+297"}>+297</MenuItem>
                        <MenuItem value={"+298"}>+298</MenuItem>
                        <MenuItem value={"+299"}>+299</MenuItem>
                        </Select>
                        <FormHelperText error={error.code}>{(error.code) ? 'Phone code cannot be blank' : 'Phone code'}</FormHelperText>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Phone number"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 1000000 } }}
                        margin="normal"
                        name="phoneNumber"
                        error={error.phoneNumber}
                        helperText={(error.phoneNumber ? 'Phone number cannot be blank' : '')} 
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        name="username"
                        error={error.username}
                        helperText={(error.username ? 'Username cannot be blank' : '')} 
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        margin="normal"
                        name="password"
                        error={error.password}
                        helperText={(error.password ? 'Password cannot be blank' : '')} 
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        error={error.confirm_password}
                        helperText={(error.confirm_password ? 'Password confirmation cannot be blank' : '')} 
                        margin="normal"
                    />
                    </Grid>
                </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={8}>
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                        name="gender"
                        value={values.gender}
                        onChange={this.handleChange}
                        error={error.gender}
                        >
                        <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                        />
                        <FormControlLabel
                            value="male"
                            control={<Radio color="primary" />}
                            label="Male"
                        />
                        </RadioGroup>
                        {error.gender ? 
                        <FormHelperText error={error.gender} >Fill gender</FormHelperText>
                        :null}
                    </FormControl>
                    <FormControl component="fieldset" required>
                        <FormLabel component="legend">Type</FormLabel>
                        <RadioGroup
                            name="type"
                            value={values.type}
                            onChange={this.handleChange}
                            error={error.type}
                            >
                            <FormControlLabel
                                value="tourist"
                                control={<Radio />}
                                label="tourist"
                            />
                            <FormControlLabel
                                value="local"
                                control={<Radio color="primary" />}
                                label="local"
                            />
                        </RadioGroup>
                        {error.type ? 
                        <FormHelperText error={error.type} >Fill type</FormHelperText>
                        :null}
                    </FormControl>
                    <br />
                    <TextField
                        fullWidth
                        id="birthDate"
                        label="Date of birth"
                        type="date"
                        InputLabelProps={{
                        shrink: true
                        }}
                        name="birthDate"
                        error={error.birthDate}
                        helperText={(error.birthDate ? 'Date of birth cannot be blank' : '')} 
                        onChange={this.handleChange}
                    />
                    <br />
                    <TextField
                        fullWidth
                        multiline
                        rows="4"
                        label="Address"
                        name="address"
                        error={error.confirm_password}
                        helperText={(error.confirm_password ? 'Address cannot be blank' : '')} 
                        onChange={this.handleChange}
                    />
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
            <br />
            <br />
            <Grid container direction="row" justify="center">
                <Session.Consumer>
                {session => (
                    <Button
                        color="secondary"
                        variant="raised"
                        onClick={() => {this.checkInput(); session.createUserAndSession(values)}}
                        >
                        Register
                    </Button>
                )}
                </Session.Consumer>
            </Grid>
            </Grid>
        );
    }
}