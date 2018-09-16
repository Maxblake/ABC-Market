import React, { Component } from 'react'
import Geolocation from 'react-geolocation'
import LocationContainer from './LocationContainer'

const GetLocation = (props) => {
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
                                submit={(props.getLocation != undefined) ? true : false} 
                                lat={latitude} 
                                long={longitude} 
                                getLocation={() => props.getLocation(latitude, longitude)} 
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

export default GetLocation