import './App.css'
import StateTogether from './components/state-together-example'
// import MapComponent from './components/map-component.jsx';
import MapTest from './components/map-test.jsx';
import GenerateQR from './components/generate-qr.jsx';

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="p-6 flex flex-col gap-6">
        <MapTest />
        <GenerateQR />
      </div>
      <StateTogether />
    </div>
  );
}

export default App;