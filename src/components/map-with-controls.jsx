// import StateTogether from './components/state-together-example'
import MapComponent from './map-component.jsx';
// import MapTest from './components/map-test.jsx';
import ButtonQR from './generate-qr.jsx';
// import { SessionManager } from 'react-together';
import AddLocation from './add-location.jsx';
import LeaveSession from './leave-session.jsx';
import { useStateTogether } from 'react-together';


function MapWithControls() {
    const [markers, setMarkers] = useStateTogether('map', []);


    return (
        <div className="grid grid-cols-1 gap-4 justify-center items-center max-w-screen-lg">
            <div className="p-6 flex flex-col gap-6">
            <MapComponent markers={markers} setMarkers={setMarkers}/>
            </div>
            <div className="flex justify-around px-2">
            <AddLocation />
            <LeaveSession setMarkers={setMarkers}/>
            <ButtonQR />
            </div>
        </div>
    );
}

export default MapWithControls;