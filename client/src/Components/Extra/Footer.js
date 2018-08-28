import React, { Component } from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";

const Footer = () => {
    return (
        <Grid container justify="center">
            <Grid item xs={12}>
                <Paper>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={6}>
                            <Typography variant="subheading">
                                Contact: ABCMarket@gmail.com
                            </Typography>
                            <Typography variant="caption">+297-0000000</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button color="secondary">Help!</Button>
                        </Grid> 
                    </Grid>
                    <Grid container direction="row">
                        <Typography variant="subheading">
                            Have a recomendation , we'll be happy to hear from you
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Footer