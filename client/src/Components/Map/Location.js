import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import LocationMarker from "./LocationMarker";

const Location = withScriptjs(withGoogleMap((props) =>{
    
    const markers = <LocationMarker
                        location={{lat:  42.3601, lng: -71.0589}}
                    />
                    
    return (
        <GoogleMap
            defaultZoom={14}
            center={ { lat:  42.3601, lng: -71.0589 } }
            >
            {markers}
        </GoogleMap>
        );
    }
))

export default Location;