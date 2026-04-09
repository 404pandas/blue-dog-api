import { getRange } from "./logic/utils";

export default function Lives({ lives, containerWidth, unit }) {
  const r = unit * 0.6;
  const spacing = unit * 1.7;

  return getRange(lives).map((i) => (
    <circle
      className="life-circle"
      key={i}
      r={r}
      cy={unit * 1.4}
      cx={containerWidth - unit - r - i * spacing}
    />
  ));
}
