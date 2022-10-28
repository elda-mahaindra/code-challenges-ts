import type * as Challenge022 from "../challenges/challenge_022";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge022>(
  "../challenges/challenge_022.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      h: 4,
      rows: ["1 3 2 1", "1 3 2 1", "1 3 2 1", "1 3 2 1"],
    },
    output: [".OOO..O", ".OOO..O", ".OOO..O", ".OOO..O"],
  },
  {
    id: 1,
    input: {
      h: 4,
      rows: ["0 1 1 1 1", "0 1 1 1 1", "0 1 1 1 1", "0 1 1 1 1"],
    },
    output: ["O.O.", "O.O.", "O.O.", "O.O."],
  },
  {
    id: 2,
    input: {
      h: 8,
      rows: [
        "0 1 1 1 1 1 1 1 1",
        "1 1 1 1 1 1 1 1",
        "0 1 1 1 1 1 1 1 1",
        "1 1 1 1 1 1 1 1",
        "0 1 1 1 1 1 1 1 1",
        "1 1 1 1 1 1 1 1",
        "0 1 1 1 1 1 1 1 1",
        "1 1 1 1 1 1 1 1",
      ],
    },
    output: [
      "O.O.O.O.",
      ".O.O.O.O",
      "O.O.O.O.",
      ".O.O.O.O",
      "O.O.O.O.",
      ".O.O.O.O",
      "O.O.O.O.",
      ".O.O.O.O",
    ],
  },
  {
    id: 3,
    input: {
      h: 4,
      rows: ["8", "0 8", "8", "0 8"],
    },
    output: ["........", "OOOOOOOO", "........", "OOOOOOOO"],
  },
  {
    id: 4,
    input: {
      h: 8,
      rows: [
        "45",
        "2 2 3 2 2 3 2 1 1 1 3 1 2 2 3 2 2 1 3 1 1 4 1",
        "1 1 2 1 1 1 2 1 1 1 2 1 1 1 1 2 2 1 1 1 2 1 1 1 2 1 1 2 1 2 1 1 4",
        "1 1 4 1 2 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 4 1 2 1 1 1 1 1 1 1 1 3 2",
        "1 1 4 1 2 1 1 1 2 1 1 1 1 1 2 2 1 1 1 2 1 4 1 1 3 1 1 1 4",
        "1 1 2 1 1 1 2 1 1 1 2 1 1 1 1 1 3 1 1 1 2 1 1 1 2 1 1 1 3 1 1 1 4",
        "2 2 3 2 2 3 2 1 1 1 3 1 2 2 2 1 2 1 1 1 3 1 1 4 1",
        "45",
      ],
    },
    output: [
      ".............................................",
      "..OO...OO..OOO..O.O...O..OO...OO..O...O.OOOO.",
      ".O..O.O..O.O..O.O.OO..O.O..O.O..O.OO.OO.O....",
      ".O....O..O.O..O.O.O.O.O.O....O..O.O.O.O.OOO..",
      ".O....O..O.O..O.O.O..OO.O.OO.OOOO.O...O.O....",
      ".O..O.O..O.O..O.O.O...O.O..O.O..O.O...O.O....",
      "..OO...OO..OOO..O.O...O..OO..O..O.O...O.OOOO.",
      ".............................................",
    ],
  },
  {
    id: 5,
    input: {
      h: 4,
      rows: ["0 1 1 2", "0 2 1 1", "0 1 1 1", "1 1 1 1"],
    },
    output: ["INVALID"],
  },
  {
    id: 6,
    input: {
      h: 5,
      rows: [
        "0 1 2 1 1 1 2 2 2 1 1 1 1 1 2 1 1 2 1 1 1 1 1 1 1 1 1 2 1 2 1 1 1 1 1 1 1 3 1 2",
        "2 3 1 1 6 1 1 1 1 1 2 2 2 1 1 1 4 1 1 1 3 2 1 2 1 1 1 1 3 1",
        "1 1 3 5 2 3 1 2 1 3 2 2 2 3 1 2 4 2 4 5 1",
        "0 1 1 1 1 3 3 1 1 2 2 2 2 1 1 3 1 1 2 1 1 2 2 1 3 1 1 1 2 4 1 1",
        "2 2 1 1 1 3 1 1 2 1 6 1 1 4 1 1 2 1 1 1 1 1 1 1 2 2 3 1 4",
      ],
    },
    output: [
      "O..O.O..OO..O.O.O..O.OO.O.O.O.O.OO.OO.O.O.O.OOO.OO",
      "..OOO.O......O.O.O..OO..O.O....O.O...OO.OO.O.O...O",
      ".O...OOOOO..OOO.OO.OOO..OO..OOO.OO....OO....OOOOO.",
      "O.O.OOO...O.OO..OO..O.OOO.O..O.OO..O...O.O..OOOO.O",
      "..OO.O.OOO.O..O......O.OOOO.O..O.O.O.O..OO...O....",
    ],
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      h: 200,
      rows: ["1 3 2 1", "1 3 2 1", "1 3 2 1", "1 3 2 1"],
    },
    error: ErrorEnum.OUT_OF_RANGE_H,
  },
  {
    id: 1,
    input: {
      h: 4,
      rows: ["1 3 2 1", "1 3 2 1", "1 3 2 1"],
    },
    error: ErrorEnum.INVALID_ROWS,
  },
];

describe("test challenge 022", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { h, rows } = input;

    expect(solution(h, rows)).toEqual(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { h, rows } = input;

    expect(() => solution(h, rows)).toThrow(error);
  });
});
