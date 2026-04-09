// Bluey blues: lighter = weaker (fewer hits remaining), darker = stronger
const BLOCK_COLORS = [
  "#87ceeb", // density 0 → 1 hit to destroy
  "#3b96d2", // density 1 → 2 hits
  "#0d4f82", // density 2 → 3 hits
];

export default function Block({ x, y, width, height, density }) {
  const fill = BLOCK_COLORS[Math.min(density, BLOCK_COLORS.length - 1)];
  return (
    <rect
      className="block"
      fill={fill}
      x={x}
      y={y}
      width={width}
      height={height}
      rx={2}
    />
  );
}
