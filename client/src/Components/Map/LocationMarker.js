import React from "react";
import { Marker } from "react-google-maps";
import ShopIcon from "./shop.png";

const LocationMarker = ({location}) => {
    return(
        <Marker position={location} icon={ShopIcon} />
    );
}

export default LocationMarker