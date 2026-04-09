export default function Level({ level, unit }) {
  return (
    <text x={unit} y={unit * 2} fontSize={unit} className="hud-text">
      LEVEL {level}
    </text>
  );
}
