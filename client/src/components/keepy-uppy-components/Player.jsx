import React from "react";
import PlayerBingo from "../../assets/images/items/balloon-player-bingo.png";

export default function Player({ x, y, width, height }) {
  <>
    <rect className='paddle' x={x} y={y} width={width} height={height} />
    <PlayerBingo id='player-bingo' cx={x} cy={y} />;
  </>;
}
