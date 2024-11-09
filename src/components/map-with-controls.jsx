// import StateTogether from './components/state-together-example'
import MapComponent from './map-component.jsx';
// import MapTest from './components/map-test.jsx';
import ButtonQR from './generate-qr.jsx';
// import { SessionManager } from 'react-together';
import AddLocation from './add-location.jsx';
import LeaveSession from './leave-session.jsx';
import { useStateTogether, useStateTogetherWithPerUserValues } from 'react-together';


function MapWithControls() {
    const [markers, setMarkers] = useStateTogether('map', []);
    const [location, setLocation, locationPerUser] = useStateTogetherWithPerUserValues('userloc', {});


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
            <div className="flex justify-around px-2">
                <AddLocation location={location} setLocation={setLocation} locationPerUser={locationPerUser}/>
                <LeaveSession setMarkers={setMarkers}/>
                <ButtonQR />
            </div>
        </div>
    );
}


export default MapWithControls;