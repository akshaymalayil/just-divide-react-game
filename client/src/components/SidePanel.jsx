import redTile from "../assets/images/red.png";
import blueTile from "../assets/images/blue.png";
import purpleTile from "../assets/images/purple.png"; // generic tile bg

const SidePanel = () => {
  return (
    <div className="side">

      <div className="side-panel">

        {/* KEEP */}
        <div className="keep-section">
          <img src={redTile} alt="keep" className="slot-bg" />
          <div className="slot-label">KEEP</div>
        </div>

        {/* QUEUE */}
        {/* <div className="queue-section">
          <div className="queue-tile red">32</div>
          <div className="queue-tile grey">12</div>
        </div> */}

        {/* TRASH */}
        <div className="trash-section">
          <div      className="slot-label">TRASH</div>

          <div className="slot-bg" style={{ backgroundImage: `url(${redTile})` }}>
            <div className="trash-count">x10</div>
          </div>
          
        </div>

      </div>
      
      {/* QUEUE */}
        <div className="queue-section">
          <div className="queue-tile left" style={{ backgroundImage: `url(${redTile})` }}>32</div>

          <div className="queue-tile right" style={{ backgroundImage: `url(${purpleTile})` }}>12</div>
        </div>
      
      
    </div>
  );
};

export default SidePanel;