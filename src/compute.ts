import { Game, Frame, LastFrame } from "./types";

export function compute(game: Game): number {
  // rules
  // [10, 0] (strike) => 10 + frame(N+1)[0] + frame(N+1)[1]
  // [x, y] (x+y) (spare) => 10 + frame(N+1)[0]
  let gameTotal: number = 0;

  game.forEach(( frame: Frame, index: number ) => {
    let frameTotal: number = 0;
    frameTotal += frame[0] + frame[1];

    // add extra points
    if (frame[0] === 10) {
      // STRIKE 🚀
      // frame == strike => 10 + frame(N+1)[0] + frame(N+1)[1]
      frameTotal += game[index+1][0] + game[index+1][1]

    } else if ( frame[0] + frame[1] == 10 ) {
      // SPARE 🚀
      // frame == spare => 10 + frame(N+1)[0]
      frameTotal = (index < 9) 
        ? frameTotal + game[index+1][0] 
        : frameTotal + game[index][2];
    }

    // add frameTotal to gameTotal
    gameTotal += frameTotal;
  });

  return gameTotal;

  // check for strikes and spares
}
