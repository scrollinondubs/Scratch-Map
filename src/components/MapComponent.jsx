import { useStateTogether } from 'react-together';
import { useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CustomMarker from './CustomMarker';

const mapContainerStyle = {
  width: '100%',
  height: '800px',
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
  draggable: false, 
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


function MapComponent() {
  const [markers, setMarkers] = useStateTogether('map', []);
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
    <div className="h-full w-full">
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

export default MapComponent;
