import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from './ui/button';
import { RiCrosshair2Line } from "react-icons/ri";



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
      <Button 
        onClick={() => getUserLocation(setLocation, setError)}
      >
        <RiCrosshair2Line size={24}/>
      </Button>
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
}

AddLocation.propTypes = {
  setLocation: PropTypes.func.isRequired,
};

export default AddLocation;
