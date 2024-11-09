import './App.css'
import StateTogether from './components/state-together-example'
import MapComponent from './components/MapComponent.jsx';

function App() {
  return (
    <div className="w-screen h-screen">
      <MapComponent />
      <StateTogether />
    </div>
  );
}

export default App;