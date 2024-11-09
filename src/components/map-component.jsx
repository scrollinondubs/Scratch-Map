import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CustomMarker from './custom-marker';
import { useState } from 'react';

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
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMapClick = useCallback((event) => {
    if (activeMarker) return;


    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setActiveMarker(newMarker)
  }, [activeMarker, setMarkers]);

  const handleSaveNote = (title, comment) => {
    if (!activeMarker) return;

    setMarkers((prevMarkers) => {
      return prevMarkers.map((marker) =>
        marker.lat === activeMarker.lat && marker.lng === activeMarker.lng
        ? {...marker, title, comment}
        : marker
      )
    })

    setActiveMarker(null);
  };

  const handleDeleteNote = (marker) => {
    setMarkers((prevMarkers) => prevMarkers.filter((m) => m !==marker));
  };

  const handleCancel = () => {
    setMarkers((prevMarkers) => 
      prevMarkers.filter((marker) => marker.lat !== activeMarker.lat || marker.lng !== activeMarker.lng)
    );
    setActiveMarker(null);
  };

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
            <CustomMarker 
              key={index} 
              position={marker} 
              title={marker.title}
              comment={marker.comment}
              onDelete={() => handleDeleteNote(marker)}
            />
          ))}
        </GoogleMap>
      </LoadScript> 

      { activeMarker && (
        <div className="mt-20">
          <input
            type="text"
            placeholder='Enter title'
            value={activeMarker.title}
            onChange={(e) => 
              setActiveMarker((prev) => ({...prev, title: e.target.value}))
            }
            className="w-full"
          />
          <textarea 
            value={activeMarker.comment}
            onChange={(e) => 
              setActiveMarker((prev) => ({...prev, comment: e.target.value}))
            }
            placeholder='Enter comment'
            rows="2"
            className="w-full"
          />
          <div>
            <button
              onClick={() => handleSaveNote(activeMarker.title, activeMarker.comment)}
              className="mt-10 mr-10"
            >
              Save Note
            </button>
            <button
              onClick={handleCancel}
              className="mt-10 bg-gray-500 text-white border-none p-5 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );

}

MapComponent.propTypes = {
  markers: PropTypes.array.isRequired,
  setMarkers: PropTypes.func.isRequired,
};

export default MapComponent;
