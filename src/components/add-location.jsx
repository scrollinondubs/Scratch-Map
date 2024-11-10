import PropTypes from 'prop-types';
import { useState } from 'react';

const getUserLocation = (setUserLocation, setError) => {
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
    setError("Geolocation not supported.");
  }
};

function AddLocation({ setLocation }) {
  const [error, setError] = useState(null);

  return (
    <div>
      <button 
        className="p-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => getUserLocation(setLocation, setError)}
      >
        Get User Location
      </button>
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
}

AddLocation.propTypes = {
  setLocation: PropTypes.func.isRequired,
};

export default AddLocation;
