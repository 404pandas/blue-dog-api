import { useEffect, useReducer, useRef } from "react";
import { gsap } from "gsap";
import "./style.css";

import { LEVELS } from "./logic/levels";
import { MOVEMENT, getNewGameState, getGameStateFromLevel } from "./logic/core";
import { registerListener } from "./logic/utils";

import Level from "./Level";
import Lives from "./Lives";
import Block from "./Block";
import Ball from "./Ball";
import Paddle from "./Paddle";

const MOVEMENT_KEYS = {
  LEFT: [65, 37],
  RIGHT: [68, 39],
};
const STOP_KEY = 32;
const UPDATE_EVERY = 1000 / 60;

const getInitialLevel = () => {
  const saved = localStorage.getItem("level");
  return saved ? parseInt(saved, 10) : 0;
};

const getProjectors = (containerSize, gameSize) => {
  const widthRatio = containerSize.width / gameSize.width;
  const heightRatio = containerSize.height / gameSize.height;
  const unitOnScreen = Math.min(widthRatio, heightRatio);
  return {
    projectDistance: (d) => d * unitOnScreen,
    projectVector: (v) => v.scaleBy(unitOnScreen),
  };
};

const getInitialState = (containerSize) => {
  const level = getInitialLevel();
  const game = getGameStateFromLevel(LEVELS[level]);
  const { projectDistance, projectVector } = getProjectors(containerSize, game.size);
  return {
    level,
    game,
    containerSize,
    projectDistance,
    projectVector,
    time: Date.now(),
    stopTime: undefined,
    movement: undefined,
    gameOver: false,
  };
};

const ACTION = {
  CONTAINER_SIZE_CHANGE: "CONTAINER_SIZE_CHANGE",
  KEY_DOWN: "KEY_DOWN",
  KEY_UP: "KEY_UP",
  TICK: "TICK",
  RESTART: "RESTART",
};

const restart = (state) => {
  const level = 0;
  localStorage.setItem("level", level);
  const game = getGameStateFromLevel(LEVELS[level]);
  return {
    ...state,
    level,
    game,
    gameOver: false,
    time: Date.now(),
    stopTime: undefined,
    movement: undefined,
    ...getProjectors(state.containerSize, game.size),
  };
};

const HANDLER = {
  [ACTION.CONTAINER_SIZE_CHANGE]: (state, containerSize) => ({
    ...state,
    containerSize,
    ...getProjectors(containerSize, state.game.size),
  }),
  [ACTION.KEY_DOWN]: (state, key) => {
    if (state.gameOver) return state;
    if (MOVEMENT_KEYS.LEFT.includes(key)) return { ...state, movement: MOVEMENT.LEFT };
    if (MOVEMENT_KEYS.RIGHT.includes(key)) return { ...state, movement: MOVEMENT.RIGHT };
    return state;
  },
  [ACTION.KEY_UP]: (state, key) => {
    // Space restarts from game-over screen
    if (key === STOP_KEY && state.gameOver) return restart(state);

    const newState = { ...state, movement: undefined };
    if (key === STOP_KEY) {
      if (state.stopTime) {
        return {
          ...newState,
          stopTime: undefined,
          time: state.time + Date.now() - state.stopTime,
        };
      }
      return { ...newState, stopTime: Date.now() };
    }
    return newState;
  },
  [ACTION.TICK]: (state) => {
    if (state.stopTime || state.gameOver) return state;

    const time = Date.now();
    const newGame = getNewGameState(state.game, state.movement, time - state.time);
    const newState = { ...state, time };

    if (newGame.lives < 1) {
      return { ...newState, game: newGame, gameOver: true };
    }
    if (newGame.blocks.length < 1) {
      const level =
        state.level >= LEVELS.length - 1 ? state.level : state.level + 1;
      localStorage.setItem("level", level);
      const game = getGameStateFromLevel(LEVELS[level]);
      return {
        ...newState,
        level,
        game,
        ...getProjectors(state.containerSize, game.size),
      };
    }
    return { ...newState, game: newGame };
  },
  [ACTION.RESTART]: (state) => restart(state),
};

const reducer = (state, { type, payload }) => {
  const handler = HANDLER[type];
  return handler ? handler(state, payload) : state;
};

export default function Scene(containerSize) {
  const [state, dispatch] = useReducer(reducer, containerSize, getInitialState);
  const act = (type, payload) => dispatch({ type, payload });
  const gameOverRef = useRef(null);

  const {
    projectDistance,
    projectVector,
    level,
    gameOver,
    game: {
      blocks,
      paddle,
      ball,
      size: { width, height },
      lives,
    },
  } = state;

  useEffect(
    () => act(ACTION.CONTAINER_SIZE_CHANGE, containerSize),
    [containerSize]
  );

  useEffect(() => {
    const onKeyDown = ({ which }) => act(ACTION.KEY_DOWN, which);
    const onKeyUp = ({ which }) => act(ACTION.KEY_UP, which);
    const tick = () => act(ACTION.TICK);

    const timerId = setInterval(tick, UPDATE_EVERY);
    const unregisterKeydown = registerListener("keydown", onKeyDown);
    const unregisterKeyup = registerListener("keyup", onKeyUp);
    return () => {
      clearInterval(timerId);
      unregisterKeydown();
      unregisterKeyup();
    };
  }, []);

  // GSAP: animate game-over overlay in
  useEffect(() => {
    if (gameOver && gameOverRef.current) {
      gsap.fromTo(
        gameOverRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
          transformOrigin: "center center",
        }
      );
    }
  }, [gameOver]);

  const viewWidth = projectDistance(width);
  const viewHeight = projectDistance(height);
  const unit = projectDistance(ball.radius);
  const cx = viewWidth / 2;
  const cy = viewHeight / 2;

  return (
    <svg width={viewWidth} height={viewHeight} className="scene">
      <Level unit={unit} level={level + 1} />
      <Lives lives={lives} containerWidth={viewWidth} unit={unit} />

      {blocks.map(({ density, position, width: bw, height: bh }) => (
        <Block
          key={`${position.x}-${position.y}`}
          density={density}
          width={projectDistance(bw)}
          height={projectDistance(bh)}
          {...projectVector(position)}
        />
      ))}

      <Paddle
        width={projectDistance(paddle.width)}
        height={projectDistance(paddle.height)}
        {...projectVector(paddle.position)}
      />

      <Ball {...projectVector(ball.center)} radius={unit} />

      {gameOver && (
        <g ref={gameOverRef} className="gameover-overlay">
          <rect
            className="gameover-bg"
            x={cx - viewWidth * 0.35}
            y={cy - viewHeight * 0.2}
            width={viewWidth * 0.7}
            height={viewHeight * 0.4}
            rx={unit * 1.5}
          />
          <text
            className="gameover-title"
            x={cx}
            y={cy - unit * 1.5}
            fontSize={unit * 2.4}
          >
            Game Over!
          </text>
          <text
            className="gameover-sub"
            x={cx}
            y={cy + unit * 1.5}
            fontSize={unit * 0.95}
          >
            Press Space to play again
          </text>
        </g>
      )}
    </svg>
  );
}
