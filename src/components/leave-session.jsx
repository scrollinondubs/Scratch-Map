import PropTypes from 'prop-types';
import { useLeaveSession, useIsTogether } from 'react-together';
import Button from './ui/button';

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
        <Button
            onClick={handleClearMap}
        >
            Clear Map
        </Button>
    );
}

LeaveSession.propTypes = {
    setMarkers: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
};

export default LeaveSession;

