import { useStateTogether } from 'react-together';
import { useCallback, useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import CustomMarker from './custom-marker';

const mapContainerStyle = {
  width: '95%',
  height: '400px',
  backgroundColor: '#e5e5e5',
  left: '2.5%',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  position: 'relative',
};

const center = {
  lat: 40.748817,
  lng: -73.985428,
};

const userLocationIcon = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  scaleControl: false,
  draggable: true,
  styles: [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#d3d3d3" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#8ab8d1" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#8ab8d1" }],
    },
    {
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

function MapTest() {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [markers, setMarkers] = useStateTogether('map', []);

  const handleMapClick = useCallback((event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  }, [setMarkers]);

  useEffect(() => {
    console.log('Markers have been synced:', markers);
  }, [markers]);

  const getUserLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          setError(null);
        },
        (err) => {
          setError(`Error fetching location: ${err.message}`);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          options={mapOptions}
          onClick={handleMapClick}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: userLocationIcon,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          )}
          {markers.map((marker, index) => (
            <CustomMarker key={index} position={marker} />
          ))}
        </GoogleMap>
      </LoadScript>

      <button id="shareLocation" onClick={getUserLocation} style={{ margin: '10px', padding: '10px', cursor: 'pointer' }}>
        <h3>Share Location</h3>
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}



export default MapTest;
