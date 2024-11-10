import PropTypes from 'prop-types';
import { useState } from 'react';
import IconButton from './ui/button';
import { RiCrosshair2Line } from "react-icons/ri";

const addRandomNoise = (value) => {
  const noise = (Math.random() - 0.5) * 0.0001;
  return value + noise;
};

const getUserLocation = (setUserLocation, setError) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: addRandomNoise(position.coords.latitude),
          lng: addRandomNoise(position.coords.longitude),
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
      <IconButton 
        onClick={() => getUserLocation(setLocation, setError)}
      >
        <RiCrosshair2Line size={24}/>
      </IconButton>
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
}

AddLocation.propTypes = {
  setLocation: PropTypes.func.isRequired,
};

export default AddLocation;
