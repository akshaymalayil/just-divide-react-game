const Header = ({ bestScore = 0, timer = '00:00' }) => {
  return (
    <div className="header">
      <h1 className="title">JUST DIVIDE</h1>

      <div className="timer">⏳ {timer}</div>

      <p className="subtitle">
        Divide with the numbers to solve the rows and columns.
      </p>

      <p className="best-score">🏆 BEST SCORE: {bestScore}</p>
    </div>
  );
};

export default Header;