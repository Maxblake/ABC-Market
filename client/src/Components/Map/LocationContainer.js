import React from "react";
import Location from "./Location";

export default class LocationContainer extends React.Component {


	render() {
		return (
			<Location
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAyP4XBNGKqXXzgR5nLIHLikys-1qvu0Y4&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `300px`, width: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}