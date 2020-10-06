import { compute } from "../src/compute";
import { Game } from "../src/types";

it("should return 300 on a perfect game", () => {
  const input300: Game = [
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 10, 10],
  ];

  const score = compute(input300);

  expect(score).toBe(300);

  const inputTripleStrike: Game = [
    [10, 0],
    [10, 0],
    [10, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0, 0],
  ]

  expect(compute(inputTripleStrike)).toBe(60)

});


it("should return 60 on just three trikes", () => {
  const inputTripleStrike: Game = [
    [10, 0],
    [10, 0],
    [10, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0, 0],
  ];

  const score = compute(inputTripleStrike);

  expect(score).toBe(60);
});

it("should return 88 on this set of frames", () => {
  const inputTripleStrike: Game = [
    [10, 0],
    [10, 0],
    [10, 0],
    [2, 8],
    [3, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0, 0],
  ];

  const score = compute(inputTripleStrike);

  expect(score).toBe(88);
});

it("should return 135 on this set of frames", () => {
  const inputTripleStrike: Game = [
    [4, 5],
    [10, 0],
    [5, 5],
    [6, 3],
    [10, 0],
    [0, 10],
    [7, 2],
    [3, 1],
    [10, 0],
    [2, 8, 1],
  ];

  const score = compute(inputTripleStrike);

  expect(score).toBe(135);
});
