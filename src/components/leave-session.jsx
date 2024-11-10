import PropTypes from 'prop-types';
import { useLeaveSession, useIsTogether } from 'react-together';

function LeaveSession({ setLocation, setMarkers }) {
    const leaveSession = useLeaveSession();
    const isTogether = useIsTogether();

    const handleClearMap = () => {
        if (isTogether) {
            leaveSession(); 
        } else {
            setLocation([]);
            setMarkers([]);
        }
        
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
    setLocation: PropTypes.func.isRequired,
};

export default LeaveSession;

