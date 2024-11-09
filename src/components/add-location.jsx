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

function AddLocation({location, setLocation, locationPerUser}) {

  const [error, setError] = useState(null);

  return (
    <div>
      <button onClick={() => getUserLocation(setLocation, setError)}>
        Get User Location
      </button>
      <div>
        {error && <p className="text-red-500">{error}</p>}

        {location && location.lat && location.lng && (
          <div>
            <p>Your location: {location.lat}, {location.lng}</p>
          </div>
        )}

        {Object.keys(locationPerUser).map((userId) => {
          const userLocation = locationPerUser[userId];
          return (
            <div key={userId}>
              <p>User {userId} location: {userLocation.lat}, {userLocation.lng}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

AddLocation.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  setLocation: PropTypes.func.isRequired,
  locationPerUser: PropTypes.objectOf(
    PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    })
  ).isRequired,
};

export default AddLocation;
