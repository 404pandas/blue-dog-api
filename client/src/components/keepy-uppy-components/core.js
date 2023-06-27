import Vector from "./vector";
import { flatten, getRandomFrom } from "./utils";

import { withoutElement, updateElement } from "./utils";

//   size declarations
const PADDLE_AREA = 1 / 3;
const BLOCK_HEIGHT = 1 / 3;
const PADDLE_HEIGHT = BLOCK_HEIGHT;
const BALL_RADIUS = 1 / 5;
const DISTANCE_IN_MS = 0.005;
const LEFT = new Vector(-1, 0);
const RIGHT = new Vector(1, 0);
const UP = new Vector(0, -1);
const DOWN = new Vector(0, 1);
export const MOVEMENT = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
const LEFT_UP = LEFT.add(UP).normalize();
const RIGHT_UP = RIGHT.add(UP).normalize();

// Distorts direction for added difficulty
const getDistortedDirection = (vector, distortionLevel = 0.3) => {
  const getComponent = () =>
    Math.random() * distortionLevel - distortionLevel / 2;
  const distortion = new Vector(getComponent(), getComponent());
  return vector.add(distortion).normalize();
};

// Checks if one side of balloon is inside boundaries
const isInBoundaries = (oneSide, otherSide, oneBoundary, otherBoundary) =>
  (oneSide >= oneBoundary && oneSide <= otherBoundary) ||
  (otherSide >= oneBoundary && otherSide <= otherBoundary);

// Adjusts angle to avoid horizontal bounce of doom
const getAdjustedVector = (normal, vector, minAngle = 15) => {
  const angle = normal.angleBetween(vector);
  const maxAngle = 90 - minAngle;
  if (angle < 0) {
    if (angle > -minAngle) {
      return normal.rotate(-minAngle);
    }
    if (angle < -maxAngle) {
      return normal.rotate(-maxAngle);
    }
  } else {
    if (angle < minAngle) {
      return normal.rotate(minAngle);
    }
    if (angle > maxAngle) {
      return normal.rotate(maxAngle);
    }
  }
  return vector;
};

// Calculates new position of paddle
const getNewPaddle = (paddle, size, distance, movement) => {
  if (!movement) return paddle;
  const direction = movement === MOVEMENT.LEFT ? LEFT : RIGHT;

  const { x } = paddle.position.add(direction.scaleBy(distance));
  const withNewX = (x) => ({
    ...paddle,
    position: new Vector(x, paddle.position.y),
  });
  if (x < 0) {
    return withNewX(0);
  }
  if (x + paddle.width > size.width) {
    return withNewX(size.width - paddle.width);
  }
  return withNewX(x);
};

// Initialize paddle and ball
export const getInitialPaddleAndBall = (width, height, paddleWidth) => {
  const paddleY = height - PADDLE_HEIGHT;
  const paddle = {
    position: new Vector((width - paddleWidth) / 2, paddleY),
    width: paddleWidth,
    height: PADDLE_HEIGHT,
  };
  const ball = {
    center: new Vector(height / 2, paddleY - BALL_RADIUS * 2),
    radius: BALL_RADIUS,
    direction: getRandomFrom(LEFT_UP, RIGHT_UP),
  };

  return {
    paddle,
    ball,
  };
};

//   Initializes state based on level
export const getGameStateFromLevel = ({
  lives,
  paddleWidth,
  speed,
  blocks,
}) => {
  const width = blocks[0].length;
  const height = width;

  const blocksStart =
    (height - height * PADDLE_AREA - blocks.length * BLOCK_HEIGHT) / 2;

  const rowsOfBlocks = blocks.map((row, i) =>
    row.map((density, j) => ({
      density,
      position: new Vector(j, blocksStart + i * BLOCK_HEIGHT),
      width: 1,
      height: BLOCK_HEIGHT,
    }))
  );

  const size = {
    width,
    height,
  };
  return {
    size,
    blocks: flatten(rowsOfBlocks),
    ...getInitialPaddleAndBall(width, height, paddleWidth),
    lives,
    speed,
  };
};

// the good stuff
export const getNewGameState = (state, movement, timespan) => {
  const { size, speed, lives } = state;
  const distance = timespan * DISTANCE_IN_MS * speed;
  const paddle = getNewPaddle(state.paddle, size, distance, movement);

  const { radius } = state.ball;
  const oldDirection = state.ball.direction;
  const newBallCenter = state.ball.center.add(oldDirection.scaleBy(distance));
  const ballBottom = newBallCenter.y + radius;
  if (ballBottom > size.height) {
    return {
      ...state,
      ...getInitialPaddleAndBall(size.width, size.height, paddle.width),
      lives: lives - 1,
    };
  }

  const withNewBallProps = (props) => ({
    ...state,
    paddle,
    ball: {
      ...state.ball,
      ...props,
    },
  });

  const withNewBallDirection = (normal) => {
    const distorted = getDistortedDirection(oldDirection.reflect(normal));
    const direction = getAdjustedVector(normal, distorted);
    return withNewBallProps({ direction });
  };
  const ballLeft = newBallCenter.x - radius;
  const ballRight = newBallCenter.x + radius;
  const ballTop = newBallCenter.y - radius;
  const paddleLeft = paddle.position.x;
  const paddleRight = paddleLeft + paddle.width;
  const paddleTop = paddle.position.y;

  const ballGoingDown = Math.abs(UP.angleBetween(oldDirection)) > 90;
  const hitPaddle =
    ballGoingDown &&
    ballBottom >= paddleTop &&
    ballRight >= paddleLeft &&
    ballLeft <= paddleRight;
  if (hitPaddle) return withNewBallDirection(UP);
  if (ballTop <= 0) return withNewBallDirection(DOWN);
  if (ballLeft <= 0) return withNewBallDirection(RIGHT);
  if (ballRight >= size.width) return withNewBallDirection(LEFT);

  const block = state.blocks.find(
    ({ position, width, height }) =>
      isInBoundaries(ballTop, ballBottom, position.y, position.y + height) &&
      isInBoundaries(ballLeft, ballRight, position.x, position.x + width)
  );
  if (block) {
    const density = block.density - 1;
    const newBlock = { ...block, density };
    const blocks =
      density < 0
        ? withoutElement(state.blocks, block)
        : updateElement(state.blocks, block, newBlock);

    const getNewBallNormal = () => {
      const blockTop = block.position.y;
      const blockBottom = blockTop + block.height;
      const blockLeft = block.position.x;
      if (ballTop > blockTop - radius && ballBottom < blockBottom + radius) {
        if (ballLeft < blockLeft) return LEFT;
        if (ballRight > blockLeft + block.width) return RIGHT;
      }
      if (ballTop > blockTop) return DOWN;
      if (ballTop <= blockTop) return UP;
    };
    return {
      ...withNewBallDirection(getNewBallNormal()),
      blocks,
    };
  }
  return withNewBallProps({ center: newBallCenter });
};
