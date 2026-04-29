import { useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import SidePanel from './components/SidePanel';
import './styles/global.css';
import { randomTile, initQueue, applyMerge } from './game/tileUtils';

function App() {
  // 4×4 grid: null = empty cell
  const [grid, setGrid]         = useState(Array(16).fill(null));
  // Queue always has 3 entries; queue[0] is the active (draggable) tile
  const [queue, setQueue]       = useState(initQueue(3));
  // Tile stored in the KEEP slot (null = empty)
  const [keepTile, setKeepTile] = useState(null);
  // Tracks whether the active tile is currently being dragged
  const [isDragging, setIsDragging] = useState(false);
  // Accumulated score
  const [score, setScore]       = useState(0);

  const activeTile = queue[0];

  /** Replace queue[0] with a new random tile at the end */
  const advanceQueue = () =>
    setQueue(prev => [...prev.slice(1), randomTile()]);

  /* ── Drag handlers ─────────────────────────────── */
  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd   = () => setIsDragging(false);

  /* ── Drop handlers ─────────────────────────────── */

  /** Drop onto an empty grid cell */
  const handleDropOnCell = (index) => {
    if (grid[index] !== null) return; // already filled — reject

    // 1. Place the tile
    let newGrid = [...grid];
    newGrid[index] = activeTile;

    // 2. Apply chain merge and collect score
    const { grid: mergedGrid, scoreGained } = applyMerge(newGrid, index);

    setGrid(mergedGrid);
    setScore(prev => prev + scoreGained);
    advanceQueue();
    setIsDragging(false);
  };

  /** Drop onto the KEEP slot */
  const handleDropOnKeep = () => {
    setKeepTile(activeTile);
    advanceQueue();
    setIsDragging(false);
  };

  /** Drop onto the TRASH slot */
  const handleDropOnTrash = () => {
    advanceQueue();          // discard — no state stored
    setIsDragging(false);
  };

  return (
    <div className="app">
      <Header />

      <div className="game-area">
        <Grid
          grid={grid}
          score={score}
          isDragging={isDragging}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDropOnCell={handleDropOnCell}
        />
        <SidePanel
          queue={queue}
          keepTile={keepTile}
          isDragging={isDragging}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDropOnKeep={handleDropOnKeep}
          onDropOnTrash={handleDropOnTrash}
        />
      </div>
    </div>
  );
}

export default App;