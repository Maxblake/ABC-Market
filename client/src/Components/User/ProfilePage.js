import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import GridListComp from "../Product/GridListComp";
import UserInfo from "./UserInfo";
import UserEdit from "./UserEdit";
import Auth, { Session } from "../../Provider/Auth";

export default class ProfilePage extends Component {
  state = {
    editMode: true,
    uploads: [
      {
        image: "image",
        name: "Franela manga corta",
        condition: "New",
        price: "200"
      },
      {
        image: "TV image",
        name: "Televisor Samsung 4K",
        condition: "New",
        price: "3000"
      },
      {
        image: "TV image",
        name: "Televisor Samsung 4K",
        condition: "New",
        price: "3000"
      }
    ]
  };

  toggleEdit = () => {
    this.setState({ editMode: !this.state.editMode });
    console.log(this.state.editMode);
  };

  render() {
    return (
      <Grid container justify="center">
        <Grid container direction="row" justify="center">
          <h1>My Account</h1>
        </Grid>

        <Grid container direction="row" justify="center">
          {this.state.editMode ? (
            <UserInfo
              user={this.props.user}
              key={this.props.user.person_id}
              toggleEdit={this.toggleEdit}
            />
          ) : (
            <UserEdit
              user={this.props.user}
              updateUser={this.props.updateUser}
              toggleEdit={this.toggleEdit}
            />
          )}
        </Grid>
        <Typography variant="display2">Uploads</Typography>
        <Grid container direction="row" justify="center">
          <br />
          <GridListComp
            type="product"
            edit={true}
            product={this.state.uploads}
          />
        </Grid>
        <br />
        <Typography variant="display2">Latest Contacts</Typography>
        <Grid container direction="row" justify="center">
          <GridListComp
            type="contact"
            sendMsg={true}
            contacts={this.props.contacts}
          />
        </Grid>
      </Grid>
    );
  }
}
