import { getBestResFromLocalStorage } from './getDataFromLocalStorage.js';

export default {
  game: {
    score: 0,
    best: getBestResFromLocalStorage(),
    grip: 20,
    speed: 13
  },
  snake: {
    x: 220,
    y: 220,
    cells: [],
    startCells: 1,
    size: 20,
    dx: 0,
    dy: 0,
    color: 'green'
  },
  apple: {
    size: 20,
    x: 120,
    y: 120,
    color: 'red'
  }
};
