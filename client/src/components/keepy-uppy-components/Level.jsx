import React from "react";

export default function Level({ level, unit }) {
  return (
    <text x={unit} y={unit * 2} fontSize={unit} className='level'>
      LEVEL: {level}
    </text>
  );
}
