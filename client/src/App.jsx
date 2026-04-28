import Header from './components/Header';
import Grid from './components/Grid';
import SidePanel from './components/SidePanel';
import './styles/global.css';

function App() {
  return (
    <div className="app">
      <Header />

      <div className="game-area">
        <Grid />
        <SidePanel />
      </div>
    </div>
  );
}

export default App;