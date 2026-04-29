const GameOver = ({ score, level, onRestart }) => {
  return (
    <div className="gameover-overlay">
      <div className="gameover-card">

        <div className="gameover-emoji">😿</div>

        <h2 className="gameover-title">Game Over</h2>
        <p className="gameover-subtitle">No more moves available</p>

        <div className="gameover-stats">
          <div className="gameover-stat">
            <span className="gameover-stat-label">SCORE</span>
            <span className="gameover-stat-value">{score}</span>
          </div>
          <div className="gameover-stat">
            <span className="gameover-stat-label">LEVEL</span>
            <span className="gameover-stat-value">{level}</span>
          </div>
        </div>

        <button className="gameover-btn" onClick={onRestart}>
          Play Again
        </button>

      </div>
    </div>
  );
};

export default GameOver;
