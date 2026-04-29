import redImg    from '../assets/images/red.png';
import blueImg   from '../assets/images/blue.png';
import purpleImg from '../assets/images/purple.png';
import orangeImg from '../assets/images/orange.png';
import pinkImg   from '../assets/images/pink.png';

/** Ordered list of tile background images */
const TILE_IMAGES = [redImg, blueImg, purpleImg, orangeImg, pinkImg];

/**
 * Returns a consistent background image for a given number.
 * Same number always gets the same colour.
 */
export function getTileImage(num) {
  return TILE_IMAGES[num % TILE_IMAGES.length];
}

/** Pool of valid tile numbers */
export const NUMBER_POOL = [
  2, 3, 4, 5, 6, 7, 8, 9, 10,
  12, 14, 15, 16, 18, 20, 21,
  24, 25, 27, 28, 30, 32, 35,
  36, 40, 42, 45, 48, 49, 50,
];

/** Pick a random number from the pool */
export function randomTile() {
  return NUMBER_POOL[Math.floor(Math.random() * NUMBER_POOL.length)];
}

/** Build an initial queue of `size` random tiles */
export function initQueue(size = 3) {
  return Array.from({ length: size }, randomTile);
}
