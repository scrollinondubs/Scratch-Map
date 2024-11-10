import PropTypes from 'prop-types';
import { useLeaveSession, useIsTogether } from 'react-together';
import IconButton from './ui/button';
import { RxCross2 } from "react-icons/rx";

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
        <IconButton
            onClick={handleClearMap}
        >
            <RxCross2 size={24}/>
        </IconButton>
    );
}

LeaveSession.propTypes = {
    setMarkers: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
};

export default LeaveSession;

