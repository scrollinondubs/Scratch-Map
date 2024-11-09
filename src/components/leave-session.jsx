import PropTypes from 'prop-types';
import { useLeaveSession } from 'react-together';
// import { useEffect } from 'react';

function LeaveSession({ setMarkers }) {
    const leaveSession = useLeaveSession();

    // useEffect(() => {
    //     setMarkers([])
    // }, [leaveSession, setMarkers])

    const handleClearMap = () => {
        leaveSession(); 
        setMarkers([]);  
    };

    return (
        <button
            onClick={handleClearMap}
            className="p-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Clear Map
        </button>
    );
}

LeaveSession.propTypes = {
    setMarkers: PropTypes.func.isRequired,
};

export default LeaveSession;

