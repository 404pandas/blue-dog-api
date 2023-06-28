import { getRange } from "./utils";

export const BLOCK_MAX_DENSITY = 3;

const getRandomBlock = () => Math.floor(Math.random() * BLOCK_MAX_DENSITY);

const getBlocks = (rows, columns) =>
  getRange(rows).map(() => getRange(columns).map(getRandomBlock));

export const LEVELS = [
  {
    lives: 5,
    paddleWidth: 3.5,
    speed: 0.3,
    blocks: getBlocks(1, 4),
  },
  {
    lives: 4,
    paddleWidth: 3,
    speed: 0.5,
    blocks: getBlocks(2, 5),
  },
  {
    lives: 3,
    paddleWidth: 3,
    speed: 1,
    blocks: getBlocks(5, 8),
  },
  {
    lives: 3,
    paddleWidth: 2,
    speed: 2,
    blocks: getBlocks(6, 9),
  },
];
