import React, { Component, Fragment } from "react";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { withRouter } from "react-router";
import SubmitProduct from "./SubmitProduct";
import SubmitSelect from "./SubmitSelect";
import SubmitVehicle from "./SubmitVehicle";
import SubmitService from "./SubmitService";
import SubmitSale from "./SubmitSale";
import SubmitPlace from "./SubmitPlace";

const Submit = (props) => {
    const typeSubmit = type => {
        switch (type) {
        case "product":
            return <SubmitSelect {...props} />;
        case "service":
            return <SubmitService {...props} />;
        case "place":
            return <SubmitPlace {...props} />;
        case "sale":
            return <SubmitSale {...props} />;
        }
    };
    
    let returned = typeSubmit(props.match.params.type);
    return <Fragment>{returned}</Fragment>;
}

export default Submit;
