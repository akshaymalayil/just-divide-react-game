import { useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import SidePanel from './components/SidePanel';
import GameOver from './components/GameOver';
import './styles/global.css';
import { randomTile, initQueue, applyMerge, hasMovesLeft } from './game/tileUtils';

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
  const [score, setScore]           = useState(0);
  // Trash uses remaining (starts at 10)
  const [trashCount, setTrashCount] = useState(10);
  // Game Over flag
  const [isGameOver, setIsGameOver] = useState(false);

  // Level is purely derived from score 
  const level = Math.floor(score / 10) + 1;

  const activeTile = queue[0];

  /** Replace queue[0] with a new random tile at the end */
  const advanceQueue = () =>
    setQueue(prev => [...prev.slice(1), randomTile()]);

  /* ── Drag handlers ─────────────────────────────── */
  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd   = () => setIsDragging(false);

  /* ── Drop handlers ─────────────────────────────── */

  /**
   * Drop onto an empty grid cell.
   * @param {number} index  - target cell index
   * @param {number} value  - tile value from dataTransfer
   * @param {string} source - 'queue' | 'keep'
   */
  const handleDropOnCell = (index, value, source) => {
    if (grid[index] !== null) return; // already filled — reject

    // 1. Place the tile
    let newGrid = [...grid];
    newGrid[index] = value;

    // 2. Apply chain merge and collect score
    const { grid: mergedGrid, scoreGained } = applyMerge(newGrid, index);
    setGrid(mergedGrid);
    setScore(prev => prev + scoreGained);

    // 3. Route post-drop action by source
    if (source === 'queue') {
      advanceQueue();         // discard used tile, add new one to queue end
    } else if (source === 'keep') {
      setKeepTile(null);      // clear the keep slot
    }

    // 4. Check for game over on the updated grid
    if (!hasMovesLeft(mergedGrid)) setIsGameOver(true);

    setIsDragging(false);
  };

  /** Drop onto the KEEP slot — only accepted when the slot is empty */
  const handleDropOnKeep = () => {
    if (keepTile !== null) return;   // slot occupied — reject
    setKeepTile(activeTile);
    advanceQueue();
    setIsDragging(false);
  };

  /** Drop onto the TRASH slot — blocked when trashCount reaches 0 */
  const handleDropOnTrash = () => {
    if (trashCount <= 0) return;       // trash is exhausted
    setTrashCount(prev => prev - 1);
    advanceQueue();                    // discard active tile
    setIsDragging(false);
  };

  /** Reset all game state to start a new game */
  const handleRestart = () => {
    setGrid(Array(16).fill(null));
    setQueue(initQueue(3));
    setKeepTile(null);
    setScore(0);
    setTrashCount(10);
    setIsGameOver(false);
  };

  return (
    <div className="app">
      {isGameOver && (
        <GameOver score={score} level={level} onRestart={handleRestart} />
      )}
      <Header />

      <div className="game-area">
        <Grid
          grid={grid}
          score={score}
          level={level}
          isDragging={isDragging}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDropOnCell={handleDropOnCell}
        />
        <SidePanel
          queue={queue}
          keepTile={keepTile}
          trashCount={trashCount}
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