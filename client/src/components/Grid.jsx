import catImg from '../assets/images/cat.png';
import badgeImg from '../assets/images/levels_score.png';

const Grid = () => {
  return (
    <div className="grid-wrapper">
      
      {/* 🔥 TOP BAR */}
      <div className="top-bar">
        <div className="badge-box" id='level'>
          <img src={badgeImg} className="badge-img" />
          <span>LEVEL 1</span>
        </div>

        {/* <img src={catImg} alt="cat"  className='catImg'/> */}
        <img src={catImg} alt="cat" className="cat-img" />

        <div className="badge-box" id='score'>
          <img src={badgeImg} className="badge-img" />
          <span>SCORE 40</span>
        </div>
      </div>

      {/* 🔷 GRID */}
      <div className="grid">
        {Array(16).fill(null).map((_, i) => (
          <div key={i} className="cell"></div>
        ))}
      </div>

    </div>
  );
};

export default Grid;