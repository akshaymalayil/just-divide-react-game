import CatBoard from './CatBoard';
import { getTileImage } from '../game/tileUtils';

const Grid = ({ grid, score, level, isDragging, onDragStart, onDragEnd, onDropOnCell }) => {
  return (
    <div className="grid-wrapper">

      {/* CatBoard — absolutely positioned above the grid via .cat-board CSS */}
      <CatBoard score={score} level={level} />

      {/* ── 4×4 GRID ── */}
      <div className="grid">
        {grid.map((cell, i) => {
          const isEmpty = cell === null;
          const canDrop = isDragging && isEmpty;

          return (
            <div
              key={i}
              className={[
                'cell',
                !isEmpty ? 'cell--filled' : '',
                canDrop ? 'cell--droppable' : '',
              ].join(' ').trim()}
              onDragOver={e => { if (isEmpty) e.preventDefault(); }}
              onDrop={e => {
                e.preventDefault();
                if (!isEmpty) return;
                try {
                  const { value, source } = JSON.parse(
                    e.dataTransfer.getData('application/json')
                  );
                  onDropOnCell(i, value, source);
                } catch {
                  // malformed dataTransfer — ignore
                }
              }}
            >
              {/* Render tile when cell is filled */}
              {!isEmpty && (
                <div
                  className="cell-tile"
                  style={{ backgroundImage: `url(${getTileImage(cell)})` }}
                >
                  {cell}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Grid;