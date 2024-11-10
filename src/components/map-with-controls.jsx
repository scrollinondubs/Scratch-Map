import MapComponent from './map-component.jsx';
import ButtonQR from './generate-qr.jsx';
import { ConnectedUsers, useIsTogether } from 'react-together';
import AddLocation from './add-location.jsx';
import LeaveSession from './leave-session.jsx';
import ImportDialog from './ui/import-dialog.jsx';
import ExportDialog from './ui/export-dialog.jsx';
import useMyStateTogether from '../hooks/useMyStateTogether.js';
import useMyStateTogetherWithPerUserValues from '../hooks/useMyStateTogetherWithPerUserValues.js';

const EMPTY_OBJECT = {}

function MapWithControls() {
    const [markers, setMarkers] = useMyStateTogether('map', []);
    const [location, setLocation, locationPerUser] = useMyStateTogetherWithPerUserValues('userloc', EMPTY_OBJECT);
    const isTogether = useIsTogether();

    return (
        <div className="relative grid grid-cols-1 gap-4 justify-center items-center max-w-screen-lg">
            <div className="p-6 flex flex-col gap-5">
                <MapComponent 
                    markers={markers} 
                    setMarkers={setMarkers}
                    location={location}
                    locationPerUser={locationPerUser}
                />
            </div>
            <div className="flex justify-between items-center px-2 mx-auto w-full max-w-3xl">
                <AddLocation location={location} setLocation={setLocation}/>
                <div className="flex justify-center space-x-16">
                    <ImportDialog setMarkers={setMarkers} />
                    <LeaveSession setLocation={setLocation} setMarkers={setMarkers}/>
                    <ExportDialog markers={markers} />
                </div>
                <ButtonQR />
            </div>
            {isTogether && (
                <div className="absolute top-10 right-10 p-2 rounded-2xl shadow-lg flex justify-center items-center bg-opacity-35 bg-slate-900">
                    <ConnectedUsers maxAvatars={5} />
                </div>
            )}
        </div>
    );
}

export default MapWithControls;