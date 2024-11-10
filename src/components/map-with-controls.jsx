// import StateTogether from './components/state-together-example'
import MapComponent from './map-component.jsx';
// import MapTest from './components/map-test.jsx';
import ButtonQR from './generate-qr.jsx';
import { ConnectedUsers } from 'react-together';
import AddLocation from './add-location.jsx';
import LeaveSession from './leave-session.jsx';
import useMyStateTogether from '../hooks/useMyStateTogether.js';
import useMyStateTogetherWithPerUserValues from '../hooks/useMyStateTogetherWithPerUserValues.js';

const EMPTY_OBJECT = {}

function MapWithControls() {
    const [markers, setMarkers] = useMyStateTogether('map', []);
    const [location, setLocation, locationPerUser] = useMyStateTogetherWithPerUserValues('userloc', EMPTY_OBJECT);


    return (
        <div className="grid grid-cols-1 gap-4 justify-center items-center max-w-screen-lg">
            <div className="p-6 flex flex-col gap-5">
                <MapComponent 
                    markers={markers} 
                    setMarkers={setMarkers}
                    location={location}
                    locationPerUser={locationPerUser}
                />
            </div>
            <div className="flex justify-center gap-6 px-2">
                <AddLocation location={location} setLocation={setLocation}/>
                <LeaveSession setLocation={setLocation} setMarkers={setMarkers}/>
                <ButtonQR />
            </div>
            <div className="flex justify-center items-center px-4 py-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-100 mr-4">
                    Users Connected:
                </h3>
                <ConnectedUsers />
            </div>
        </div>
    );
}


export default MapWithControls;