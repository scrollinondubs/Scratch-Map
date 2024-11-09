import { useStateTogether } from 'react-together';
import React, { useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CustomMarker from './CustomMarker'; // Import the custom marker component

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.748817,
  lng: -73.985428,
};

function MapComponent() {
  const [markers, setMarkers] = useStateTogether('map', []); // State to store marker positions
  console.log('Markers:', markers);  // Debugging output for state

  // Function to handle clicks on the map
  const handleMapClick = useCallback((event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    // Update state with the new marker
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  }, [setMarkers]);

  useEffect(() => {
    console.log('Markers have been synced:', markers); // Check for syncing
  }, [markers]);

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick} // Register the click event
        >
          {markers.map((marker, index) => (
            <CustomMarker key={index} position={marker} />
          ))}
        </GoogleMap>
      </LoadScript>

      
    </div>
  );
}

export default MapComponent;
