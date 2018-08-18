import React, { Component } from "react";
import { Button, Icon, Grid, TextField, Paper } from "@material-ui/core";

export default class ProductEdit extends Component {
  onProductChange = event => {
    console.log(this.props.product[event.target.name]);
    console.log(event.target.name + "///" + event.target.value);
    this.props.product[event.target.name] = event.target.value;
  };

  render() {
    return (
      <Paper>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={12} sm={6}>
            <img src="../logo.svg" alt="" />
            <p>multer pls</p>
            <p>varias imagenes pequenas</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container direction="row" justify="flex-end">
              <Button
                mini
                variant="fab"
                color="secondary"
                onClick={this.props.handleEdit}
              >
                <Icon>edit_icon</Icon>
              </Button>
            </Grid>
            <TextField
              onChange={this.onProductChange}
              margin="normal"
              name="name"
              label="Product Name"
              defaultValue={this.props.product.name}
            />
            <br />
            <TextField
              onChange={this.onProductChange}
              margin="normal"
              defaultValue={this.props.product.brand}
              name="brand"
              label="Brand"
            />
            <br />
            <TextField
              onChange={this.onProductChange}
              margin="normal"
              name="condition"
              label="Condition"
              defaultValue={this.props.product.condition}
            />
            <br />
            <TextField
              onChange={this.onProductChange}
              margin="normal"
              name="price"
              label="Price"
              defaultValue={this.props.product.price}
            />
            <br />
            <Button
              variant="raised"
              color="secondary"
              onClick={() => this.props.updateProduct(this.props.product)}
            >
              Update
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <TextField
            onChange={this.onProductChange}
            multiline
            fullWidth
            rows="4"
            margin="normal"
            name="description"
            label="Product Description"
            defaultValue={this.props.product.description}
          />
        </Grid>
      </Paper>
    );
  }
}
