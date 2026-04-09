export default function Paddle({ x, y, width, height }) {
  return (
    <rect
      className="paddle"
      x={x}
      y={y}
      width={width}
      height={height}
      rx={height * 0.45}
      ry={height * 0.45}
    />
  );
}
