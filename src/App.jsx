import './App.css'
import StateTogether from './components/state-together-example'
import MapComponent from './components/MapComponent.jsx';
import { SessionManager } from 'react-together';

function App() {
  return (
    <div>
      <h1>My Collaborative Map App</h1>
      <MapComponent />
      <StateTogether />
    </div>
  );
}

export default App;