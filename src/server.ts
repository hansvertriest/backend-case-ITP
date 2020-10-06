import http from "http";
import express from "express";
import { compute } from "./compute";

import { invalidInputError } from './types';

const app = express();

app.use(express.json());

app.post("/compute", (request, response) => {
  const game = request.body.game;
  // TODO: Validate input

  let invalidInput: invalidInputError = {"frameLengthErrors": []};

  if (game.length != 10 ) {
    // error in number of frames
    // as string because 0 === false
    invalidInput.invalidFrameCount = `${game.length}`;
  } else {
    // Loop through frames to check dimensions
    game.forEach(( frame, index: number ) => {
      const frameLength = frame.length;
      if (frameLength < 2) {
        // a frame smaller than 2 throws
        invalidInput.frameLengthErrors.push(`Error at frame ${index+1}: a frame should have 2 throws, max 3 (for the last)`);
      } else if (frameLength > 2 && index != 9) {
        // a frame larger than 2 throws, but not the last one
        invalidInput.frameLengthErrors.push(`Error at frame ${index+1}: a frame should have 2 throws, max 3 (for the last)`);
      } else if (index == 9 && frameLength != 3) {
        // last frame is larger than three throws
        invalidInput.frameLengthErrors.push(`Error at frame ${index+1}: the last frame should have 3 throws`);
      }
    });
  }
  if (Object.keys(invalidInput.frameLengthErrors).length > 0 || invalidInput.invalidFrameCount){
    // invalidInput != empty
    return response
      .status(400)
      .json({"status": 400, "error": invalidInput});
  }

  const score = compute(game);

  // TODO: Return response
  return response.status(200).json({score});
});

export const createServer = () => http.createServer(app);
