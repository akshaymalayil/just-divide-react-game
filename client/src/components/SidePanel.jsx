import { getTileImage } from '../game/tileUtils';
import redTile from '../assets/images/red.png';

const SidePanel = ({
  queue,
  keepTile,
  isDragging,
  onDragStart,
  onDragEnd,
  onDropOnKeep,
  onDropOnTrash,
}) => {
  const [active, ...upcoming] = queue;

  return (
    <div className="side">

      {/* ── ORANGE PANEL (KEEP + TRASH) ── */}
      <div className="side-panel">

        {/* KEEP — drop target */}
        <div
          className={`keep-section${isDragging ? ' slot--droppable' : ''}`}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); onDropOnKeep(); }}
        >
          <div
            className="slot-bg"
            style={{
              backgroundImage: keepTile
                ? `url(${getTileImage(keepTile)})`
                : 'none',
            }}
          >
            {keepTile && <span className="slot-value">{keepTile}</span>}
          </div>
          <div className="slot-label">KEEP</div>
        </div>

        {/* TRASH — drop target */}
        <div
          className={`trash-section${isDragging ? ' slot--droppable' : ''}`}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); onDropOnTrash(); }}
        >
          <div className="slot-label">TRASH</div>
          <div
            className="slot-bg"
            style={{ backgroundImage: `url(${redTile})` }}
          >
            <div className="trash-count">x10</div>
          </div>
        </div>

      </div>

      {/* ── QUEUE: active tile (big, draggable) + 2 upcoming (smaller) ── */}
      <div className="queue-section">

        {/* Active tile — the only draggable element */}
        <div
          className="queue-tile queue-tile--active"
          draggable
          style={{
            backgroundImage: `url(${getTileImage(active)})`,
            cursor: 'grab',
          }}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          {active}
        </div>

        {/* Next 2 tiles — display only, not draggable */}
        <div className="queue-upcoming">
          {upcoming.slice(0, 2).map((num, i) => (
            <div
              key={i}
              className="queue-tile queue-tile--next"
              style={{ backgroundImage: `url(${getTileImage(num)})` }}
            >
              {num}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default SidePanel;