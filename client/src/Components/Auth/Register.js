import React, { Component } from "react";
import { Button } from "@material-ui/core";
import {
  Grid,
  Radio,
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Input,
  Paper
} from "@material-ui/core";
import { Session } from "../../Provider/Auth";
import { handleChange } from "../../../Helpers/Helpers";
export default class Register extends Component {
  state = {
    name: "",
    lastname: "",
    username: "",
    code: "",
    phoneNumber: "",
    password: "",
    gender: "",
    type: "",
    birthDate: "",
    address: "",
    errors: {
      name: false,
    lastname: false,
    username: false,
    code: false,
    phoneNumber: false,
    password: false,
    gender: false,
    type: false,
    birthDate: false,
    address: false
    }
  };

  render() {
    const {
      name,
      lastname,
      username,
      code,
      phoneNumber,
      password,
      gender,
      type,
      birthDate,
      address
    } = this.state;
    return (
      <form>
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
                    id="name"
                    label="Name"
                    margin="normal"
                    name="name"
                    value={this.state.name}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    margin="normal"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={handleChange}
                  />
                  <br />
                  <FormControl>
                    <InputLabel>Code</InputLabel>
                    <Select
                      value={this.state.code}
                      onChange={handleChange}
                      input={<Input name="code" />}
                    >
                      <MenuItem value={"+297"}>+297</MenuItem>
                      <MenuItem value={"+298"}>+298</MenuItem>
                      <MenuItem value={"+299"}>+299</MenuItem>
                    </Select>
                    <FormHelperText>Phone Code</FormHelperText>
                  </FormControl>
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    label="phone number"
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 1000000 } }}
                    margin="normal"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    fullWidth
                    id="username"
                    label="Username"
                    margin="normal"
                    name="username"
                    value={this.state.username}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    fullWidth
                    type="password"
                    id="password"
                    label="Password"
                    margin="normal"
                    name="password"
                    value={this.state.password}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    fullWidth
                    type="password"
                    id="password2"
                    label="Confirm Password"
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
                      value={this.state.gender}
                      onChange={handleChange}
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
                  </FormControl>
                  <FormControl component="fieldset" required>
                    <FormLabel component="legend">Type</FormLabel>
                    <RadioGroup
                      name="type"
                      value={this.state.type}
                      onChange={handleChange}
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
                  </FormControl>
                  <br />
                  <TextField
                    fullWidth
                    id="birthDate"
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{
                      shrink: true
                    }}
                    name="birthDate"
                    value={this.state.birthDate}
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    fullWidth
                    multiline
                    rows="4"
                    label="Address"
                    name="address"
                    value={this.state.address}
                    onChange={handleChange}
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
                  onClick={() =>
                    session.createUserAndSession(
                      name,
                      lastname,
                      username,
                      code,
                      phoneNumber,
                      password,
                      gender,
                      type,
                      birthDate,
                      address
                    )
                  }
                >
                  Register
                </Button>
              )}
            </Session.Consumer>
          </Grid>
        </Grid>
      </form>
    );
  }
}
