// src/components/MapComponent.js

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};
const center = {
  lat: 40.748817,
  lng: -73.985428,
};

function MapComponent() {
  return (
    <LoadScript googleMapsApiKey='AIzaSyDg8hca8PZ2YLCuV79MoarvU98uTVqhy_E'>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;