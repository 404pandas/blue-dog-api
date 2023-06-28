import React from "react";
// import BalloonBall from "../../assets/images/items/balloon-ball.png";

export default ({ x, y, radius }) => (
  <circle className='ball' cx={x} cy={y} r={radius} />
);
