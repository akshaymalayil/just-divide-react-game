const Header = ({ bestScore = 0 }) => {
  return (
    <div className="header">
      <h1 className="title">JUST DIVIDE</h1>

      <div className="timer">⏳ 00:07</div>

      <p className="subtitle">
        Divide with the numbers to solve the rows and columns.
      </p>

      <p className="best-score">🏆 BEST SCORE: {bestScore}</p>
    </div>
  );
};

export default Header;