import React, { Component } from "react";
import ProductDetail from "./ProductDetail";
import ProductEdit from "./ProductEdit";
import ContactDetail from "./ContactDetail";
import { Collapse, Grid, Zoom } from "@material-ui/core";

export default class ProductPage extends Component {
  state = {
    opened: true,
    contact: false,
    msg: false,
    editMode: false,
    seller: {}
  };

  contactSeller = id => {
    fetch(`/product/contact/${id}`)
      .then(response => response.json())
      .then(result => {
        this.setState({
          contact: !this.state.contact,
          seller: result.contact
        });
      });
  };

  messageToggle = () => {
    console.log("toggle message tab");
    this.setState({ msg: !this.state.msg });
  };
  updateProduct = product => {
    this.setState({
      product,
      editMode: false
    });
  };

  handleEdit = () => {
    this.setState({
      msg: false,
      contact: false,
      editMode: !this.state.editMode
    });
  };

  render() {
    return (
      <Zoom in={this.state.opened}>
        <Grid container justify="center">
          <Grid item sm={8}>
            <br />
            {this.state.editMode ? (
              <ProductEdit
                id={this.props.match.params.item}
                handleEdit={this.handleEdit}
                updateProduct={this.updateProduct}
              />
            ) : (
              <ProductDetail
                id={this.props.match.params.item}
                handleEdit={this.handleEdit}
                contactSeller={this.contactSeller}
              />
            )}

            <Collapse in={this.state.contact}>
              <ContactDetail
                msg={this.state.msg}
                sendMessage={this.sendMessage}
                contact={this.state.contact}
                messageToggle={this.messageToggle}
                seller={this.state.seller}
              />
            </Collapse>
          </Grid>
        </Grid>
      </Zoom>
    );
  }
}
