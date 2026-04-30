# JUST DIVIDE

A fun number puzzle game. Drag tiles onto a 4×4 grid — when two tiles touch, they divide. 

---

## How to Play

1. Drag the active tile from the side panel onto any empty cell.
2. If the new tile and its neighbour can divide, they merge.
3. Keep going until the grid is full with no moves left — that's Game Over.

**Keep** — save a tile for later.  
**Trash** — throw away a tile you don't want (10 uses).

---


## My Approach

I kept the project simple and easy to follow:

- **All game state in one place** (`App.jsx`) — score, grid, queue, timer. No hidden state spread across files.
- **Game logic is separate** (`tileUtils.js`) — the merge rules live in a plain JS file, completely separate from React. Easy to read and test.
- **Each component does one thing** — `Grid` shows cells, `SidePanel` shows the queue, `Header` shows the timer and score, `CatBoard`  cat + badges.

---

## Key Decisions

**Why one state file?**  
The game isn't big enough to need a state library. Keeping everything in `App.jsx` means you can read the whole game flow in one scroll.

**Why separate the merge logic?**  
Keeping them in `tileUtils.js` makes them easy to understand and test on their own.



---

## Challenges

**Designing correct merge logic**  
Implementing the merge rules correctly was challenging, especially handling multiple cases:
- equal tiles disappearing  
- division-based merges  
- removing results equal to 1  

Ensuring all these rules worked together without conflicts required careful planning and testing.

**Handling chain reactions reliably**  
A single merge can trigger further merges. Managing these chain reactions in a predictable way without causing infinite loops or missing valid merges required an iterative approach.

**Maintaining consistent state updates**  
Ensuring that grid updates, merges, score updates, and queue updates all happen in the correct order was challenging due to React’s asynchronous state updates.

---
## What I'd Improve Next

- **Undo button** — let players take back their last move (maybe 3 times per game).
- **Merge animation** — a small pop or flash when tiles combine, so it feels more satisfying.
- **Keyboard support** — let players use arrow keys and Enter instead of drag and drop, for better accessibility.
- **Hint system** — suggest possible valid moves to help players learn division concepts.
- **Difficulty levels** — changing the game play based on the level
- **Improved mobile interaction** — replace drag-and-drop with tap-based placement for smoother mobile gameplay.
- **Sound effects** — add feedback for tile drop, merge, and game over events to improve engagement.


