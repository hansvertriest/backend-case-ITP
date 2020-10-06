import { Game, Frame, LastFrame } from "./types";
import e from "express";

const getStrikePoints = (game: Game, frameIndex: number) => {
  const nextFrame : Frame | LastFrame = game[frameIndex+1];
  // sparePoints starts as 10 because definition of spare
  let strikePoints:number = 10;

  if (frameIndex < 9) {
    // frame != last one
    if (nextFrame[0] == 10) {
      // firstBall = strike => firstball is 10 (strike) and secondBall is the first one of frame after firstBall
      const firstBall: number = 10;
      const secondBall : number = (frameIndex+2 <= 9)? game[frameIndex+2][0] : game[frameIndex + 1][1];
      strikePoints += firstBall + secondBall;
    } else {
      // spare / normal => firstBall is first one after initial strike, secondBall is second one after initial strike
      const firstBall: number = nextFrame[0];
      const secondBall : number = nextFrame[1];
      strikePoints += firstBall + secondBall;
    }
  } else {
    // frame = last one => second, third element is added to the first strikes initial 10
    strikePoints +=  game[frameIndex][1] + game[frameIndex][2];
  }

  return strikePoints;
}

const getSparePoints = (game: Game, frameIndex: number) => {
  const nextFrame : Frame | LastFrame = game[frameIndex+1];
  // sparePoints starts as 10 because definition of spare
  let sparePoints:number = 10;

  if (frameIndex < 9) {
    // frame != last one
    if (nextFrame[0] == 10) {
      // firstBall = strike => extra ball is a 10
      const firstBall: number = 10;
      sparePoints += firstBall;
    } else {
      // firstBall = spare / normal => extra ball is the first one of the next frame 
      const firstBall: number = nextFrame[0];
      sparePoints += firstBall;
    }
  } else {
    // frame = last one => third element is added to the spares 10
    sparePoints += game[frameIndex][2];
  }

  return sparePoints;

}

const getFrameTotal = (game: Game, frameIndex: number) => {
    const frame : Frame | LastFrame = game[frameIndex];
    let frameTotal: number = 0;

    if (frame[0] == 10) {
      // frame = STRIKE  🚀
      frameTotal += getStrikePoints(game, frameIndex);
    } else if ( frame[0] + frame[1] == 10 ) {
      // frame = SPARE  🚀
      frameTotal += getSparePoints(game, frameIndex);
    } else {
      // frame = normal  
      frameTotal += frame[0] + frame[1];
    }

    return frameTotal;
}


export function compute(game: Game): number {
  let gameTotal: number = 0;

  game.forEach(( frame: Frame, index: number ) => {
    let frameTotal: number = getFrameTotal(game, index);
    gameTotal += frameTotal;
  });

  return gameTotal;

}
