import React from "react";
import Location from "./Location";

export default class LocationContainer extends React.Component {
	
	componentDidMount() {
		if (this.props.submit)
		this.props.getLocation(this.props.lat, this.props.long)
	}

	render() {
		return (
			<Location
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAyP4XBNGKqXXzgR5nLIHLikys-1qvu0Y4&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={
					<div style={ (this.props.submit == undefined) ? 
						{ height: `300px`, width: `400px` } :
						{ height: `150px`, width: `250px` } } 
					/>}
				mapElement={<div style={{ height: `100%` }} />}
				lat={this.props.lat}
				long={this.props.long}
			/>
		);
	}
}