import React, { Component } from "react";
import { Grid, Typography, Paper, TextField } from "@material-ui/core";

const About = () => {
    return (
        <Grid container justify="center">
            <Grid item xs={8}>
            <br />
                <Paper>
                    <Grid container direction="row" justify="center">
                        <Typography align="justify" variant="display2">
                            About Us / Contado
                        </Typography>
                    </Grid>
                    <br />
                    <br />
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="display1" align="justify">
                            image here
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography align="justify" variant="subheading">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Expedita quos possimus blanditiis veniam fuga nam modi placeat
                            quis delectus, laboriosam et unde voluptate sequi atque iusto
                            inventore molestias perspiciatis culpa!
                            </Typography>
                            <br />
                            <br />
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="flex-start">
                        <Grid item xs={12}>
                            <Typography align="justify" variant="display1">
                                Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="justify" variant="subheading">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                                molestias molestiae maiores expedita dicta dignissimos?
                            </Typography>
                            <br />
                            <br />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="justify" variant="display1">
                                Contado
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="justify" variant="headline">
                                Email: ABCMarket@gmail.com
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="justify" variant="headline">
                                Phone Number: +297-0010001
                            </Typography>
                            <br />
                            <br />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid item xs={12}>
                                <Typography align="justify" variant="display1">
                                    Messaging:
                                </Typography>
                                <br />
                                <br />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Name" />
                                <br />
                                <br />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Subject" />
                                <br />
                                <br />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Message" multiline rows="4" />
                                <br />
                                <br />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    ); 
}

export default About