import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker,Polyline,InfoWindow } from "react-google-maps"
import { compose, withProps } from "recompose"
import  config from "../../../config"
import Loader from "../loader";

class MapComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: this.props.address && this.props.address.displayLat ? this.props.address.displayLat : null,
            lng: this.props.address && this.props.address.displayLng ? this.props.address.displayLng : null
        }
    }
    mapData(results, status) {
        if (status === "OK") {
            this.setState({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
            })
            this.props.newLocation(this.state.lat,this.state.lng)
            this.props.initialLocation(this.state.lat,this.state.lng)
        }
    }
    buildMap() {
        let address = "Paschim Vihar, New Delhi";
        let geocoder = new window.google.maps.Geocoder();
        if(address){
            geocoder.geocode({ "address": address.replace(/[^a-zA-Z0-9,\s]/g, "") }, this.mapData.bind(this))
        }
    }
    componentDidMount() {
        this.buildMap() 
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.address) !== JSON.stringify(this.props.address)) {
            this.buildMap() 
        }
    }
    mapClick(lat,lng){
        this.setState({lat,lng})
        this.props.newLocation(lat,lng)
    }
    render() {
        const { lat, lng } = this.state
        console.log(this.props.currentData)
        return (
            <>
            { lat && lng ?
            <GoogleMap
                zoom={10}
                center={{ lat, lng }}
                onClick={(event)=>this.mapClick(event.latLng.lat(),event.latLng.lng())}
            >
                <Marker 
                    position={{ lat, lng }}
                />
                {this.props.currentData && this.props.currentData.location &&  this.props.currentData.location.start  ?
                 <Marker
                    key={this.props.currentData.location.id}
                    position={{ lat: this.props.currentData.location.start.lat, lng: this.props.currentData.location.start.lng}}>
                   
                    <InfoWindow>
                        <div style={{'color':'black'}}>
                           Start
                        </div>
                    </InfoWindow>
                </Marker> : null }
                {this.props.currentData && this.props.currentData.location &&  this.props.currentData.location.end  ?
                 <Marker
                    key={this.props.currentData.location.id}
                    position={{ lat: this.props.currentData.location.end.lat, lng: this.props.currentData.location.end.lng}}>
                    <InfoWindow>
                        <div style={{'color':'black'}}>
                           End
                        </div>
                    </InfoWindow>
                </Marker> : null }


                {this.props.polyLines ?
                <Polyline
                    path={this.props.polyLines}
                    geodesic={true}
                    options={{
                        strokeColor: "#ff2527",
                        strokeOpacity: 0.75,
                        strokeWeight: 2,
                        icons: [
                            {
                                icon: "hello",
                                offset: "0",
                                repeat: "20px"
                            }
                        ]
                    }}
                /> : null }
            </GoogleMap> : <Loader/>}
            </>
            )
    }
}

export default compose(
    withProps({
        googleMapURL:`https://maps.googleapis.com/maps/api/js?key=${config.placesAPI}&libraries=places&_v=32_20200110`,
        loadingElement: (<div style={{ height: "100%" }} />),
        containerElement: (<div style={{ height: "300px" }} />),
        mapElement: (<div style={{ height: "100%"}} />),
    }),
    withScriptjs,
    withGoogleMap)(MapComponent)
