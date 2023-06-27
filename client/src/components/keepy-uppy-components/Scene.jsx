import React, { useReducer } from "react";
import "./style.css";

import { LEVELS } from "./levels";
import { getGameStateFromLevel } from "./core";
import Level from "./Level";
import Lives from "./Lives";
import Block from "./Block";
import Player from "./Player";
import Balloon from "./Balloon";

const getInitialLevel = () => {
  const inState = localStorage.getItem("level");
  return inState ? parseInt(inState, 10) : 0;
};

const getProjectors = (containerSize, gameSize) => {
  const widthRatio = containerSize.width / gameSize.width;
  const heightRatio = containerSize.height / gameSize.height;
  const unitOnScreen = Math.min(widthRatio, heightRatio);

  return {
    projectDistance: (distance) => distance * unitOnScreen,
    projectVector: (vector) => vector.scaleBy(unitOnScreen),
  };
};

const getInitialState = (containerSize) => {
  const level = getInitialLevel();
  const game = getGameStateFromLevel(LEVELS[level]);
  const { projectDistance, projectVector } = getProjectors(
    containerSize,
    game.size
  );
  return {
    level,
    game,
    containerSize,
    projectDistance,
    projectVector,
    time: Date.now(),
    stopTime: undefined,
    movement: undefined,
  };
};

const reducer = (state) => state;

export default function Scene(containerSize) {
  const [state] = useReducer(reducer, containerSize, getInitialState);
  const {
    projectDistance,
    projectVector,
    level,
    game: {
      blocks,
      paddle,
      ball,
      size: { width, height },
      lives,
    },
  } = state;

  const viewWidth = projectDistance(width);
  const unit = projectDistance(ball.radius);
  return (
    <svg width={viewWidth} height={projectDistance(height)} className='scene'>
      <Level unit={unit} level={level + 1} />
      <Lives lives={lives} containerWidth={viewWidth} unit={unit} />
      {blocks.map(({ density, position, width, height }) => (
        <Block
          density={density}
          key={`${position.x}-${position.y}`}
          width={projectDistance(width)}
          height={projectDistance(height)}
          {...projectVector(position)}
        />
      ))}
      <Player
        width={projectDistance(paddle.width)}
        height={projectDistance(paddle.height)}
        {...projectVector(paddle.position)}
      />
      <Balloon {...projectVector(ball.center)} radius={unit} />
    </svg>
  );
}
