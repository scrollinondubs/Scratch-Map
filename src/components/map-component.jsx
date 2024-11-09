import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CustomMarker from './custom-marker';

const mapContainerStyle = {
  width: '700px',
  height: '700px',
  borderRadius: '10px',
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
};

const center = {
  lat: 38.7169,
  lng: -9.1399,
};

const mapOptions = { 
  disableDefaultUI: true,  
  zoomControl: false,            
  mapTypeControl: false,       
  streetViewControl: false,       
  fullscreenControl: false,      
  scaleControl: false,   
  draggable: true, 
  styles: [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#d3d3d3",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          color: "#8ab8d1", 
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off", 
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off", 
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#8ab8d1",
        },
      ],
    },
    {
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],

  },
  ],
};

function MapComponent({markers, setMarkers}) {
  console.log('Markers:', markers);

  const handleMapClick = useCallback((event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
  }, [setMarkers]);

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  return (
    <div className="flex justify-center align-middle">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onClick={handleMapClick}
          options={mapOptions}
        >
          {markers.map((marker, index) => (
            <CustomMarker key={index} position={marker} />
          ))}
        </GoogleMap>
      </LoadScript> 
    </div>
  );

}

MapComponent.propTypes = {
  markers: PropTypes.array.isRequired,
  setMarkers: PropTypes.func.isRequired,
};

export default MapComponent;
