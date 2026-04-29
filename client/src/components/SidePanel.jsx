import redTile    from "../assets/images/red.png";
import blueTile   from "../assets/images/blue.png";
import purpleTile from "../assets/images/purple.png";
import orangeTile from "../assets/images/orange.png";

const SidePanel = () => {
  return (
    <div className="side">

      {/* ── ORANGE PANEL (KEEP + TRASH) ── */}
      <div className="side-panel">

        {/* KEEP */}
        <div className="keep-section">
          <img src={blueTile} alt="keep slot" className="slot-bg" />
          <div className="slot-label">KEEP</div>
        </div>

        {/* TRASH */}
        <div className="trash-section">
          <div className="slot-label">TRASH</div>
          <div
            className="slot-bg"
            style={{ backgroundImage: `url(${redTile})` }}
          >
            <div className="trash-count">x10</div>
          </div>
        </div>

      </div>

      {/* ── QUEUE: active tile (big left) + 2 upcoming (small right) ── */}
      <div className="queue-section">

        {/* Active / top tile — full size */}
        <div
          className="queue-tile queue-tile--active"
          style={{ backgroundImage: `url(${redTile})` }}
        >
          32
        </div>

        {/* Next 2 tiles — smaller, stacked */}
        <div className="queue-upcoming">
          <div
            className="queue-tile queue-tile--next"
            style={{ backgroundImage: `url(${purpleTile})` }}
          >
            12
          </div>
          <div
            className="queue-tile queue-tile--next"
            style={{ backgroundImage: `url(${orangeTile})` }}
          >
            8
          </div>
        </div>

      </div>

    </div>
  );
};

export default SidePanel;