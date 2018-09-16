import React, { Component } from "react";
import { Grid, TextField, Paper, Typography } from "@material-ui/core";
import GridListComp from "./GridListComp";
import { byCategory, search } from "./Request";

export default class Category extends Component {

    state = {
        products: [],
        search: [],
        loaded: false
    }

    componentDidMount() {
        const { type, category } = this.props.match.params
        const kind = (type == 'products' && category == 'vehicles') ? 'vehicle' : (type == 'products' && category !== 'vehicle') ? 'article' : (type == 'sales') ? 'offer' : (type == 'places') ? 'place' : (type == 'services') ? 'service' :   type
        byCategory(kind, category, products => {
            this.setState({ products, loaded: true })
        })
    }

    searchProduct = (e) => {
        const { type, category } = this.props.match.params
        const kind = (type == 'products' && category == 'vehicles') ? 'vehicle' : (type == 'products' && category !== 'vehicle') ? 'article' : (type == 'sales') ? 'offer' : (type == 'places') ? 'place' : (type == 'services') ? 'service' :  type
        const body = {
            name: `${e.target.value}%`,
            category
        }
        search(kind, body, search => {
            this.setState({ search })
        })
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12} sm={8}>
                <br />
                {(this.state.loaded == true) ? 
                    <Paper>
                        <Grid >
                            <Grid item xs={12}>
                                <Grid container direction="row" justify="center">
                                    <Typography variant="display2">
                                        {this.props.match.params.category}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                            <Grid container direction="row" justify="center">
                                <Grid item xs={12} sm={10}>
                                    <Grid container direction="row" justify="center">
                                        <Typography variant="display1">Latest</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container direction="row" justify="center">
                                <Grid item xs={12} sm={10}>
                                    <Grid container direction="row" justify="center">
                                        <GridListComp type="product" product={this.state.products} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <br />
                        <br />
                        <br />
                        <Grid >
                            <Grid item xs={12}>
                                <Grid container direction="row" justify="center">
                                    <Grid item xs={10}>
                                        <TextField
                                            onChange={(e) => this.searchProduct(e)}
                                            id="search"
                                            label="Search "
                                            fullWidth
                                            color="secondary"
                                            type="search"
                                            margin="normal"/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <br />
                        <br />
                        <Grid container direction="row" justify="center">
                            <Grid item xs={12} sm={10}>
                                <Grid container direction="row" justify="center">
                                    <Typography variant="display1">Search</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="center">
                            <Grid item xs={12} sm={10}>
                                <Grid container direction="row" justify="center">
                                    <GridListComp type="product" product={this.state.search} />
                                </Grid>
                            </Grid>
                        </Grid>
              
                    </Paper>
                            : null
                        }
                </Grid>
            </Grid>
        );
    }
}

