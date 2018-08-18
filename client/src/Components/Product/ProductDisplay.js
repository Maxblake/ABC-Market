import React, { Component } from "react";
import { Grid, Typography, Paper, Button, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class ProductDisplay extends Component {
  render() {
    const { image, product_id } = this.props.product;
    return (
      <Grid item xs={12}>
        <Paper>
          <Grid container direction="row">
            <Grid item xs={3}>
              <Avatar src={image} />
            </Grid>
            <Grid item xs={6}>
              {Object.keys(this.props.product).map(
                key =>
                  key !== "image" ? (
                    key !== "product_id" ? (
                      <Typography key={key} variant="subheading">
                        {this.props.product[key]}
                      </Typography>
                    ) : null
                  ) : null
              )}
            </Grid>
            <Grid item xs={3}>
              {this.props.edit ? (
                <Button variant="outlined" color="secondary">
                  Edit
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to={`/details/${product_id}`}
                >
                  View
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}
