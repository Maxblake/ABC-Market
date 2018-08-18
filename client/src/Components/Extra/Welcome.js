import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Grid container direction="row" justify="center" spacing={40}>
              <Grid item xs={3}>
                <h1>ABCMarket</h1>
                <h2> Are you a...?</h2>
              </Grid>
              <Grid item xs={12} spacing={40}>
                <Button variant="raised" color="secondary">
                  Turist
                </Button>
                <Button variant="raised" color="secondary">
                  Local
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
