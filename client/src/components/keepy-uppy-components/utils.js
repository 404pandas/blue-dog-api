export const getRange = (length) => [...Array(length).keys()];
export const blockMaxHits = 3;

// register, add, and remove event listener
export const registerListener = (eventName, handler) => {
  window.addEventListener(eventName, handler);
  return () => window.removeEventListener(eventName, handler);
};

// Random Black
const getRandomBlock = () => Math.floor(Math.random() * blockMaxHits);

// Get Block
const getBlocks = (rows, columns) =>
  getRange(rows).map(() => getRange(columns).map(getRandomBlock));
export const getRandomFrom = (...args) =>
  args[Math.floor(Math.random() * args.length)];
export const flatten = (arrays) =>
  arrays.reduce((acc, row) => [...acc, ...row], []);

export const LEVELS = [
  {
    lives: 5,
    paddleWidth: 3.5,
    speed: 1,
    blocks: getBlocks(3, 6),
  },
  {
    lives: 4,
    paddleWidth: 3,
    speed: 1.4,
    blocks: getBlocks(4, 7),
  },
  {
    lives: 3,
    paddleWidth: 2.5,
    speed: 1.8,
    blocks: getBlocks(5, 8),
  },
  {
    lives: 3,
    paddleWidth: 2,
    speed: 2.2,
    blocks: getBlocks(6, 9),
  },
];

export const toDegrees = (radians) => (radians * 180) / Math.PI;
export const toRadians = (degrees) => (degrees * Math.PI) / 180;

export const withoutElement = (array, element) =>
  array.filter((e) => e !== element);

export const updateElement = (array, oldElement, newElement) =>
  array.map((e) => (e === oldElement ? newElement : e));
