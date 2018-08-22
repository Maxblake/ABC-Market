import React from "react";
import { Marker } from "react-google-maps";
import ShopIcon from "./shop.png";

export default class LocationMarker extends React.Component {
    render(){
        return(
            <Marker
            position={this.props.location}
            icon={ShopIcon}
            >
            </Marker>
        );
    }
}