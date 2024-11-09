// src/components/CustomMarker.jsx
import React from 'react';
import { Marker } from '@react-google-maps/api';

const CustomMarker = ({ position }) => {
  return (
    <Marker
      position={position} // Google Maps expects the position as lat/lng
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6, // Size of the circle
        fillColor: 'blue',
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 2,
      }}
    />
  );
};

export default CustomMarker;
