import catImg   from '../assets/images/cat.png';
import badgeImg from '../assets/images/levels_score.png';
import { getTileImage } from '../game/tileUtils';

const Grid = ({ grid, score, level, isDragging, dragPayload, onDragStart, onDragEnd, onDropOnCell }) => {
  return (
    <div className="grid-wrapper">

      {/* ── TOP BAR: cat + level/score badges ── */}
      <div className="top-bar">
        <div className="badge-box" id="level">
          <img src={badgeImg} className="badge-img" alt="" />
          <span>LEVEL {level}</span>
        </div>

        <img src={catImg} alt="cat" className="cat-img" />

        <div className="badge-box" id="score">
          <img src={badgeImg} className="badge-img" alt="" />
          <span>SCORE {score}</span>
        </div>
      </div>

      {/* ── 4×4 GRID ── */}
      <div className="grid">
        {grid.map((cell, i) => {
          const isEmpty   = cell === null;
          const canDrop   = isDragging && isEmpty;

          return (
            <div
              key={i}
              className={[
                'cell',
                !isEmpty  ? 'cell--filled'    : '',
                canDrop   ? 'cell--droppable' : '',
              ].join(' ').trim()}
              onDragOver={e => { if (isEmpty) e.preventDefault(); }}
              onDrop={e => {
                e.preventDefault();
                if (!isEmpty) return;
                try {
                  const raw = e.dataTransfer.getData('application/json');
                  const { value, source } = raw ? JSON.parse(raw) : (dragPayload ?? {});
                  if (value != null && source != null) onDropOnCell(i, value, source);
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