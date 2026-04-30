import catImg   from '../assets/images/cat.png';
import badgeImg from '../assets/images/levels_score.png';

/**
 * CatBoard — decorative strip that sits above the grid.
 * Renders the cat mascot flanked by level and score badges.
 * Purely presentational — receives score & level as props.
 */
const CatBoard = ({ score, level }) => {
  return (
    <div className="cat-board">
      {/* Level badge — left */}
      <div className="badge-box" id="level">
        <img src={badgeImg} className="badge-img" alt="" />
        <span>LEVEL {level}</span>
      </div>

      {/* Cat mascot — centre */}
      <img src={catImg} alt="cat mascot" className="cat-img" />

      {/* Score badge — right */}
      <div className="badge-box" id="score">
        <img src={badgeImg} className="badge-img" alt="" />
        <span>SCORE {score}</span>
      </div>
    </div>
  );
};

export default CatBoard;
