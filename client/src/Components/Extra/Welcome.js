import React, { Component } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Welcome = () => {
    return (
        <Grid 
        container 
        direction="column"
        justify="center"
        alignItems="center">
            <Grid item xs={12}>
                <h1>ABCMarket</h1>
                <h2> Are you a...?</h2>
            </Grid>
            <Grid item xs={6}>
                <Button 
                    variant="raised"
                    color="secondary"
                    component={ Link } to="/home/tourist" >
                    Turist
                </Button>
                <Button 
                    variant="raised"
                    color="secondary" 
                    component={ Link } to="/home/local">
                    Local
                </Button>
            </Grid>
        </Grid>
    )
}

export default Welcome