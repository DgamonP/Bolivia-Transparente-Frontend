import React, { Component } from 'react';
import {Map,InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class DirectionMap extends Component {
  render(){
    return(
      <Map google={this.props.google} 
          style={{width:'180px', height:'150px'}}
          initialCenter={{
            lat:-16.508460,
            lng:-68.125174
          }} 
          zoom={15}
          onClick={this.onMapClicked}
        >
        <Marker onClick={this.onMarkerClick}
              name={'current location'}/>
      <InfoWindow onClose={this.onInfoWindowClose}>
      </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCaH6d-lCQKfQo7zxHsyBK2w5MoN_kS0c4'
})(DirectionMap)

