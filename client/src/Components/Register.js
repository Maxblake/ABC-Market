import React,{Component} from 'react';
import {Button} from '@material-ui/core';
import {Grid,Radio,TextField,FormControl,FormHelperText,FormLabel,RadioGroup,FormControlLabel,Select,MenuItem,InputLabel,Input,Paper} from '@material-ui/core'


export default class Register extends Component{

  state={
    name:"",
    lastName:"",
    username:"",
    code:"",
    phoneNumber:"",
    password:"",
    gender:"",
    userType:"",
    birthDate:"",
    address:"",
    email:""
  }
    
    handleChange=(event)=>{
      console.log(event.target.name+"//"+event.target.value)
          this.setState({[event.target.name]:event.target.value});
    
        }
    register=()=>{
      console.log("registered user with the following data :"+JSON.stringify(this.state))
    }

    render(){
      return  (
       <form >
        <Grid container>
          <Grid container
            direction="row"
            justify="center"
            >
            <h1>Register</h1>
          </Grid>
          <Grid container 
            direction="row"
            justify="center"
            spacing={0}
            >
          <Grid item xs={12} sm={3}>
          <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              margin="normal"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          <br/>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              margin="normal"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          <br/>
          <FormControl>
            <InputLabel>Code</InputLabel>
            <Select
            value={this.state.code}
            onChange={this.handleChange}
              input={<Input name="code" />}
            >
              <MenuItem value={"+297"}>+297</MenuItem>
              <MenuItem value={"+298"}>+298</MenuItem>
              <MenuItem value={"+299"}>+299</MenuItem>
            </Select>
            <FormHelperText>Phone Code</FormHelperText>
          </FormControl>
          <TextField fullWidth
            id="phoneNumber"
            label="phone number"
            type="number"
            margin="normal"
            name="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.handleChange}
          />
          <br/>
          <TextField fullWidth
              id="username"
              label="Username"
              margin="normal"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
          />
         <br/>
        <TextField fullWidth
          type="password"
          id="password"
          label="Password"
          margin="normal"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br/>
        <TextField fullWidth
          type="password"
          id="password2"
          label="Confirm Password"
          margin="normal"
        />
      </Grid>
    </Grid>
  </Grid>
    <Grid item xs={12} sm={3} >
      <Grid container justify="center">
        <Grid item xs={12}sm={8}>
            <FormControl component="fieldset" required >
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={this.state.gender}
                onChange={this.handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" required >
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup
                name="userType"
                value={this.state.userType}
                onChange={this.handleChange}
              >
                <FormControlLabel value="tourist" control={<Radio />} label="tourist" />
                <FormControlLabel value="local" control={<Radio color="primary"/>} label="local" /> 
              </RadioGroup>
            </FormControl>
            <br/>
            <TextField fullWidth
              id="birthDate"
              label="Date of Birth"
              type="date"
              defaultValue={new Date().toLocaleDateString}
              InputLabelProps={{
                shrink: true,
              }}
              name="birthDate"
              value={this.state.birthDate}
              onChange={this.handleChange}
            />
            <br/>
            <TextField fullWidth
              multiline
              rows="4"
              label="Address"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            ></TextField>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <br/><br/>
    <Grid container
      direction="row"
      justify="center"
      >
    <Button color="secondary"variant="raised" onClick={this.register}>
      Register 
    </Button>
    </Grid>
  </Grid>
</form>
    )  
  }
}

