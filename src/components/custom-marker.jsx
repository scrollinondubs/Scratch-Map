// src/components/CustomMarker.jsx
import PropTypes from 'prop-types';
import {useState} from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const CustomMarker = ({ position, comment, onDelete }) => {
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
          // eslint-disable-next-line no-undef
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6, // Size of the circle
          fillColor: 'blue',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        }}
        onClick={handleMarkerClick}
      />
      {showInfoWindow && (
      <InfoWindow position={position} onCloseClick={handleMarkerClick}>
        <div className="max-w-[200px] flex flex-col gap-2 align-middle">
          {comment && ( 
            <p className="text-sm">
              {comment}
            </p>
          )}
          
          <div className="flex gap-2 align-middle justify-center">
            <a 
              href={googleMapsUrl}
              className="text-xs text-[#007bff] no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
            <button
              onClick={onDelete}
              className="p-2 font-semibold bg-red-500 rounded-md text-white border-none cursor-pointer"
            >
              Delete
            </button>
          </div>
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
  comment: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default CustomMarker;
