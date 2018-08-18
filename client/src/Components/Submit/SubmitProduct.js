import React, { Component } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Input,
  FormHelperText,
  Button
} from "@material-ui/core";
import Auth, { Session } from "../../Provider/Auth";
import {handleChange} from '../../../Helpers/Helpers'
const auth = new Auth();

class SubmitProduct extends Component {
  file = React.createRef();

  state = {
    description: null,
    title: null,
    stock: null,
    price: null,
    used: null,
    link: null,
    post_time: "",
    location: "",
    errors:{
      description: false,
    title: false,
    stock: false,
    price: false,
    used: false,
    link: false,
    post_time: false,
    location: false
    }
  };


  create = user => {
    const {
      description,
      title,
      stock,
      price,
      used,
      link,
      post_time,
      location
    } = this.state;
    const body = new FormData();
    const { files } = this.file.current;
    for (var i = 0; i < files.length; i++) {
      var filing = files[i];
      body.append("files[]", filing, filing.name);
    }
    body.append("description", description);
    body.append("title", title);
    body.append("stock", stock);
    body.append("price", price);
    body.append("used", used);
    body.append("link", link);
    body.append("post_time", post_time);
    body.append("location", location);
    fetch("/product/article/new", {
      method: "POST",
      credentials: "include",
      body
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        alert("connection error");
        console.log(err);
      });
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={8}>
          <br />
          <Typography variant="headline">Submit/Product</Typography>
          <br />
          <Paper>
            <Grid container direction="row" justify="center">
              <Grid item xs={12}>
                <input type="file" multiple ref={this.file} />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center">
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="title"
                  margin="normal"
                  label="Title"
                  placeholder="Use key words to help users find your product easily..."
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center" spacing={8}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  name="stock"
                  label="Quantity"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 1000000 } }}
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 1000000 } }}
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center">
              <Grid item xs={10}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">State</FormLabel>
                  <RadioGroup
                    name="used"
                    value={this.state.used}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="New"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Used"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center">
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="link"
                  label="Youtube Link"
                  defaultValue="http://"
                  margin="normal"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center" spacing={8}>
              <Grid item xs={10}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  spacing={8}
                  alignItems="center"
                >
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Post time</InputLabel>
                      <Select
                        value={this.state.post_time}
                        onChange={handleChange}
                        input={<Input name="post_time" />}
                      >
                        <MenuItem value={30}>30 days</MenuItem>
                        <MenuItem value={60}>60 days</MenuItem>
                        <MenuItem value={90}>90 days</MenuItem>
                      </Select>
                      <FormHelperText>
                        Period that the post will be visible to users
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Location</InputLabel>
                      <Select
                        value={this.state.location}
                        onChange={handleChange}
                        input={<Input name="location" />}
                      >
                        <MenuItem value={"Aruba"}>Aruba</MenuItem>
                        <MenuItem value={"Bonaire"}>Bonaire</MenuItem>
                        <MenuItem value={"Curacao"}>Curacao</MenuItem>
                      </Select>
                      <FormHelperText>Product origin </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="row" justify="center">
              <Grid item xs={10}>
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  fullWidth
                  rows={4}
                  margin="normal"
                  placeholder="detail the product the best way possible for better user understanding and to ease the sale "
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <br />
            <Grid container direction="row" justify="center">
              <Button variant="raised" color="secondary" onClick={this.create}>
                {" "}
                Submit{" "}
              </Button>
            </Grid>
            <br />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default SubmitProduct;
