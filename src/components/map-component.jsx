import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
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
  clickableIcons: false,
  styles: [
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#2b8cbe" }, { visibility: "on" }]},
    { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#a6bddb" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#FFFFED" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#ece7f2" }] },
    { elementType: "labels", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text", stylers: [{ visibility: "simplified" } ]},
    { elementType: "labels.icon", stylers: [{ visibility: "off"}]},
],
};

function MapComponent({ markers, setMarkers, location, locationPerUser }) {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMapClick = useCallback((event) => {
    if (activeMarker) return;

    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setActiveMarker(newMarker);
  }, [activeMarker, setMarkers]);

  const handleSaveNote = (comment) => {
    if (!activeMarker) return;
  
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.lat === activeMarker.lat && marker.lng === activeMarker.lng
          ? { ...marker, comment }
          : marker
      )
    );
    setActiveMarker(null);
  };
  

  const handleDeleteNote = (marker) => {
    setMarkers((prevMarkers) => prevMarkers.filter((m) => m !== marker));
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
          {location.lat && location.lng && (
            <Marker
              key="current-user"
              position={location}
            />
          )}

          {Object.keys(locationPerUser).map((userId) => {
            const userLocation = locationPerUser[userId];
            return (
              <Marker
                key={userId}
                position={userLocation}
              />
            );
          })}

          {markers.map((marker, index) => (
            <CustomMarker
              key={index}
              position={marker}
              comment={marker.comment}
              onDelete={() => handleDeleteNote(marker)}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {activeMarker && (
        <div className="mt-20">
          <input
            value={activeMarker.comment}
            onChange={(e) => setActiveMarker({ ...activeMarker, comment: e.target.value })}
            placeholder="Enter comment"
            className="w-full"
          />
          <div>
            <button onClick={() => handleSaveNote(activeMarker.comment)} className="mt-10 mr-10 text-white">
              Save Note
            </button>
            <button onClick={handleCancel} className="bg-gray-500 text-white border-none p-5 cursor-pointer">
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
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  locationPerUser: PropTypes.objectOf(
    PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    })
  ).isRequired,
};

export default MapComponent;
