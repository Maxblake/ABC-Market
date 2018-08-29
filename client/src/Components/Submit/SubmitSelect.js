import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const SubmitSelect = (props) => {
    return (
        <Grid container justify="center">
            <Grid item xs={12} sm={8}>
                <Grid container direction="row" justify="center">
                    <Grid item xs={12} sm={8}>
                    <br />
                    <br />
                    <Typography variant="display2">
                        What do you wish to submit to ABCMarket?
                    </Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container direction="row" justify="center" spacing={40}>
                    <Grid item xs={6}>
                        <Grid container direction="row" justify="center">
                            <Button
                            fullWidth
                            variant="raised"
                            color="secondary"
                            component={Link}
                            to={`${props.match.url}/vehicle`}
                            >
                            Vehicle
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="row" justify="center">
                            <Button
                            fullWidth
                            variant="raised"
                            color="secondary"
                            component={Link}
                            to={`${props.match.url}/article`}
                            >
                            Product
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SubmitSelect;
