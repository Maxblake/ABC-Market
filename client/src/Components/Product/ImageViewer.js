import React, { Component } from "react";
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Styles/imageViewer";
import { productImages } from "./Request";

class ImageViewer extends Component {
    state = {
        loaded: false,
        images: [],
        selectedImage: []
    };

    componentDidMount() {
        productImages(this.props.id, images => {
            console.log(images)
            this.setState(prevState => ({
                loaded: true,
                images: prevState.images.concat(images),
                selectedImage: 0
            }));
        });
    }

    select = page => {
        this.setState({
        selectedImage: page
        });
    };

    render() {
        const { images, selectedImage } = this.state;
        const { classes } = this.props;

        return this.state.loaded == false ? (
        <h1> Loading </h1>
        ) : (
        <Grid container justify="center" className={classes.container}>
            <Grid item lg={9} mg={9} sm={9} xs={9} className={classes.main}>
            <center>
                <img
                src={images[selectedImage]}
                alt="Image title"
                style={{
                    maxWidth: "100%",
                    height: "auto"
                }}
                />
            </center>
            </Grid>
            <Grid item lg={9} mg={9} sm={9} xs={9}>
            <GridList className={classes.gridList} cols={4}>
                {images.map((img, i) => {
                if (images[selectedImage] != img)
                    return (
                    <GridListTile key={i} rows={0.5}>
                        <img src={img} alt="title" onClick={() => this.select(i)} />
                    </GridListTile>
                    );
                })}
            </GridList>
            </Grid>
        </Grid>
        );
    }
}

export default withStyles(styles)(ImageViewer);
