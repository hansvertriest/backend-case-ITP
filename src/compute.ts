import { Game, Frame, LastFrame } from "./types";
import e from "express";

const getStrikePoints = (game: Game, frameIndex: number) => {
  const nextFrame : Frame | LastFrame = game[frameIndex+1];
  let strikePoints:number = 10;
  if (frameIndex < 9) {
    if (nextFrame[0] == 10) {
      // firstBall = strike
      const firstBall: number = 10;
      const secondBall : number = (frameIndex+2 <= 9)? game[frameIndex+2][0] : game[frameIndex + 1][1];
      strikePoints += firstBall + secondBall;
    } else {
      // spare / normal
      const firstBall: number = nextFrame[0];
      const secondBall : number = nextFrame[1];
      strikePoints += firstBall + secondBall;
    }
  } else {
    strikePoints += game[frameIndex][0] + game[frameIndex][1] + game[frameIndex][2];
  }

  return strikePoints;
}

const getSparePoints = (game: Game, frameIndex: number) => {
  const nextFrame : Frame | LastFrame = game[frameIndex+1];
  let sparePoints:number = 10;
  if (frameIndex < 9) {
    if (nextFrame[0] == 10) {
      // firstBall = strike
      const firstBall: number = 10;
      sparePoints += firstBall;
    } else {
      // spare / normal
      const firstBall: number = nextFrame[0];
      sparePoints += firstBall;
    }
  } else {
    sparePoints += game[frameIndex][2];
  }

  return sparePoints;

}

const getFrameTotal = (game: Game, frameIndex: number) => {
    const frame : Frame | LastFrame = game[frameIndex];
    let frameTotal: number = 0;

    if (frame[0] == 10) {
      // strike
      frameTotal += getStrikePoints(game, frameIndex);
    } else if ( frame[0] + frame[1] == 10 ) {
      // spare
      frameTotal += getSparePoints(game, frameIndex);
    } else {
      frameTotal += frame[0] + frame[1];
    }

    return frameTotal;
}


export function compute(game: Game): number {
  // rules
  // [10, 0] (strike) => 10 + frame(N+1)[0] + frame(N+1)[1]
  // [x, y] (x+y) (spare) => 10 + frame(N+1)[0]
  let gameTotal: number = 0;

  game.forEach(( frame: Frame, index: number ) => {

    let frameTotal: number = getFrameTotal(game, index);

    console.log(frameTotal);
    // add frameTotal to gameTotal
    gameTotal += frameTotal;
  });

  return gameTotal;

  // check for strikes and spares
}
