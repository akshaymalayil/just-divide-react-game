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

// ─── MERGE LOGIC ────────────────────────────────────────────────────────────

/**
 * Returns the 4 immediate neighbour indices for a cell in a 4×4 grid.
 * null means the neighbour is out of bounds.
 *
 *   [up]
 * [left] [index] [right]
 *   [down]
 */
export function getNeighbors(index) {
  const row = Math.floor(index / 4);
  const col = index % 4;
  return [
    row > 0 ? index - 4 : null,  // up
    row < 3 ? index + 4 : null,  // down
    col > 0 ? index - 1 : null,  // left
    col < 3 ? index + 1 : null,  // right
  ];
}

/**
 * Attempt to merge two adjacent tile values.
 *
 * Rules:
 *   1. a === b            → both disappear          { aVal: null, bVal: null }
 *   2. larger % smaller === 0
 *        → result = larger / smaller
 *        → result === 1 → also removed              { winner: null }
 *        → larger cell keeps result, smaller disappears
 *   3. Not divisible      → no merge                returns null
 *
 * @param {number} a  value of the placed cell
 * @param {number} b  value of the neighbour cell
 * @returns {{ aVal: number|null, bVal: number|null } | null}
 */
export function tryMerge(a, b) {
  if (a === null || b === null) return null;

  // Rule 1 — same value: both vanish
  if (a === b) return { aVal: null, bVal: null };

  const larger  = a > b ? a : b;
  const smaller = a > b ? b : a;

  // Rule 2 — larger is divisible by smaller
  if (larger % smaller === 0) {
    const result = larger / smaller;
    // Rule 3 — result of 1 is also removed
    const kept = result === 1 ? null : result;

    return a > b
      ? { aVal: kept, bVal: null }   // a was larger → a keeps result
      : { aVal: null, bVal: kept };  // b was larger → b keeps result
  }

  return null; // no merge possible
}

/**
 * Run one pass of merge checks after placing a tile at `index`.
 * Checks all 4 neighbours left-to-right, top-to-bottom.
 * Stops checking further neighbours if the placed tile is consumed.
 * No recursion — single pass only.
 *
 * @param {Array}  grid   current 16-element grid array
 * @param {number} index  cell where the new tile was placed
 * @returns {Array} new grid array with merges applied
 */
export function applyMerge(grid, index) {
  const next = [...grid];

  for (const neighborIdx of getNeighbors(index)) {
    if (neighborIdx === null) continue;

    const a = next[index];
    const b = next[neighborIdx];

    const merged = tryMerge(a, b);
    if (!merged) continue;

    next[index]       = merged.aVal;
    next[neighborIdx] = merged.bVal;

    // If the placed tile was consumed, no point checking remaining neighbours
    if (next[index] === null) break;
  }

  return next;
}

