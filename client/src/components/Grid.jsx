const Grid = () => {
  return (
    <div className="grid">
      {Array(16).fill(null).map((_, i) => (
        <div key={i} className="cell"></div>
      ))}
    </div>
  );
};

export default Grid;