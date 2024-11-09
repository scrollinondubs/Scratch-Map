// src/components/CustomMarker.jsx
import PropTypes from 'prop-types';
import {useState} from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const CustomMarker = ({ position, title, comment, onDelete }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMarkerClick = () => {
    setShowInfoWindow((prev) => !prev);
  };

  const googleMapsUrl = `https://www.google.com/maps?q=${position.lat},${position.lng}`;

  return (
    <div>
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
        onClick={handleMarkerClick}
      />
      {showInfoWindow && (title || comment) && (
        <InfoWindow position={position} onCloseClick={handleMarkerClick}>
          <div className="p-10 max-w-[200px]">
            {title && (
              <h4 className="text-md mb-5">
                {title}
              </h4>)}
            {comment && ( 
              <p className="text-sm mt-5 mb-5">
                {comment}
              </p>)}
            {position && ( 
              <a 
                href={googleMapsUrl}
                className="text-sm text-[#007bff] no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>)}
            <button
              onClick={onDelete}
              className="mt-10 bg-red-500 text-white border-none p-5 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </InfoWindow>
      )}
    </div>
  );
};

CustomMarker.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  title: PropTypes.string,
  comment: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default CustomMarker;
