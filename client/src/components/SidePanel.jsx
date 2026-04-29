import { getTileImage } from '../game/tileUtils';
import redTile from '../assets/images/red.png';

const SidePanel = ({
  queue,
  keepTile,
  trashCount,
  isDragging,
  onDragStart,
  onDragEnd,
  onDropOnKeep,
  onDropOnTrash,
}) => {
  const [active, ...upcoming] = queue;
  const trashAvailable = trashCount > 0;
  const keepFull       = keepTile !== null;  // slot is occupied

  return (
    <div className="side">

      {/* ── ORANGE PANEL (KEEP + TRASH) ── */}
      <div className="side-panel">

        {/* KEEP — drop target; tile is also draggable back to the grid */}
        <div
          className={[
            'keep-section',
            isDragging && !keepFull ? 'slot--droppable' : '',
            keepFull                ? 'keep--full'       : '',
          ].join(' ').trim()}
          onDragOver={e => { if (!keepFull) e.preventDefault(); }}
          onDrop={e => { e.preventDefault(); if (!keepFull) onDropOnKeep(); }}
        >
          <div
            className="slot-bg"
            draggable={!!keepTile}
            style={{
              backgroundImage: keepTile ? `url(${getTileImage(keepTile)})` : 'none',
              cursor: keepTile ? 'grab' : 'default',
            }}
            onDragStart={keepTile ? e => {
              e.dataTransfer.setData(
                'application/json',
                JSON.stringify({ value: keepTile, source: 'keep' })
              );
              onDragStart();
            } : undefined}
            onDragEnd={keepTile ? onDragEnd : undefined}
          >
            {keepTile && <span className="slot-value">{keepTile}</span>}
          </div>
          <div className="slot-label">KEEP</div>
        </div>

        {/* TRASH — drop target, disabled when trashCount === 0 */}
        <div
          className={[
            'trash-section',
            isDragging && trashAvailable ? 'slot--droppable' : '',
            !trashAvailable              ? 'trash--empty'    : '',
          ].join(' ').trim()}
          onDragOver={e => { if (trashAvailable) e.preventDefault(); }}
          onDrop={e => { e.preventDefault(); if (trashAvailable) onDropOnTrash(); }}
        >
          <div className="slot-label">TRASH</div>
          <div
            className="slot-bg"
            style={{ backgroundImage: `url(${redTile})` }}
          >
            <div className="trash-count">x{trashCount}</div>
          </div>
        </div>

      </div>

      {/* ── QUEUE: active tile (big, draggable) + 2 upcoming (smaller) ── */}
      <div className="queue-section">

        {/* Active tile — draggable from queue */}
        <div
          className="queue-tile queue-tile--active"
          draggable
          style={{
            backgroundImage: `url(${getTileImage(active)})`,
            cursor: 'grab',
          }}
          onDragStart={e => {
            e.dataTransfer.setData(
              'application/json',
              JSON.stringify({ value: active, source: 'queue' })
            );
            onDragStart();
          }}
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