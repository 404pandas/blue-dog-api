export default function Ball({ x, y, radius }) {
  return (
    <>
      <defs>
        <radialGradient id="balloon-grad" cx="38%" cy="28%" r="65%">
          <stop offset="0%"   stopColor="#ff9999" />
          <stop offset="40%"  stopColor="#e82020" />
          <stop offset="100%" stopColor="#8b0000" />
        </radialGradient>
        {/* small specular highlight */}
        <radialGradient id="balloon-shine" cx="38%" cy="28%" r="40%">
          <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* balloon body */}
      <circle className="ball" cx={x} cy={y} r={radius} fill="url(#balloon-grad)" />
      {/* shine layer */}
      <circle cx={x} cy={y} r={radius} fill="url(#balloon-shine)" />
      {/* knot at bottom */}
      <ellipse
        cx={x}
        cy={y + radius + radius * 0.18}
        rx={radius * 0.18}
        ry={radius * 0.22}
        fill="#8b0000"
      />
      {/* string */}
      <line
        x1={x}
        y1={y + radius + radius * 0.4}
        x2={x + radius * 0.3}
        y2={y + radius * 2.2}
        stroke="#8b0000"
        strokeWidth={radius * 0.08}
        strokeLinecap="round"
      />
    </>
  );
}
