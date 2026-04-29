const Header = ({ bestScore }) => {
  return (
    <div className="header">
      <h1 className="title">JUST DIVIDE</h1>

      <div className="timer">⏳ 00:07</div>

      <p className="subtitle">
        Divide with the numbers to solve the rows and columns.
      </p>

      {/* Best score ribbon — always shown */}
      <div className="best-score-bar">
        🏆 Best Score: <strong>{bestScore}</strong>
      </div>
    </div>
  );
};

export default Header;