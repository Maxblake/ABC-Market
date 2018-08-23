import React, { Component } from 'react'
import Geolocation from 'react-geolocation'
import LocationContainer from './LocationContainer'

export default class GetLocation extends Component {

    render() {
        return (
            <div>
                <Geolocation
                    render={({
                        fetchingPosition,
                        position: { coords: { latitude, longitude } = {} } = {},
                        error,
                        getCurrentPosition,
                    }) =>
                        <div>
                            {longitude != undefined ? 
                                <LocationContainer 
                                    submit={(this.props.getLocation != undefined) ? true : false} 
                                    lat={latitude} 
                                    long={longitude} 
                                    getLocation={() => this.props.getLocation(latitude, longitude)} 
                                />
                            :
                                <button onClick={getCurrentPosition}>
                                    Get Position
                                </button>
                            }
                            {error &&
                            <div>
                            {error.message}
                            </div>}
                        </div>
                    }
                />
            </div>
        )
    }
}
