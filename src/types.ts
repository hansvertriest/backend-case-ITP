export type invalidInputError = {
  invalidFrameCount?: number;
  frameLengthErrors:string[];
}

export type Frame = [number, number];

export type LastFrame = [number, number, number];

export type Game = [
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  Frame,
  LastFrame
];
