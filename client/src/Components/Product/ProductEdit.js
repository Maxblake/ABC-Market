import React, { Component } from "react";
import { Button, Icon, Grid, TextField, Paper } from "@material-ui/core";

const ProductEdit  = (props) => {
    const onProductChange = event => {
        props.product[event.target.name] = event.target.value;
    }

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
                            onClick={props.handleEdit}>
                            <Icon>edit_icon</Icon>
                        </Button>
                    </Grid>
                    <TextField
                        onChange={onProductChange}
                        margin="normal"
                        name="name"
                        label="Product Name"
                        defaultValue={props.product.name}/>
                    <br />
                    <TextField
                        onChange={onProductChange}
                        margin="normal"
                        defaultValue={props.product.brand}
                        name="brand"
                        label="Brand"/>
                    <br />
                    <TextField
                        onChange={onProductChange}
                        margin="normal"
                        name="condition"
                        label="Condition"
                        defaultValue={props.product.condition}/>
                    <br />
                    <TextField
                        onChange={onProductChange}
                        margin="normal"
                        name="price"
                        label="Price"
                        defaultValue={props.product.price}/>
                    <br />
                    <Button
                        variant="raised"
                        color="secondary"
                        onClick={() => props.updateProduct(props.product)}>
                        Update
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <TextField
                    onChange={onProductChange}
                    multiline
                    fullWidth
                    rows="4"
                    margin="normal"
                    name="description"
                    label="Product Description"
                    defaultValue={props.product.description}/>
            </Grid>
        </Paper>
    );
}
