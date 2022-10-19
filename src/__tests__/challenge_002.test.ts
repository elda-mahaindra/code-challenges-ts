import type * as Challenge002 from "../challenges/challenge_002";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge002>(
  "../challenges/challenge_002.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      board: [
        [7, 9, 2, 1, 5, 4, 3, 8, 6],
        [6, 4, 3, 8, 2, 7, 1, 5, 9],
        [8, 5, 1, 3, 9, 6, 7, 2, 4],
        [2, 6, 5, 9, 7, 3, 8, 4, 1],
        [4, 8, 9, 5, 6, 1, 2, 7, 3],
        [3, 1, 7, 4, 8, 2, 9, 6, 5],
        [1, 3, 6, 7, 4, 8, 5, 9, 2],
        [9, 7, 4, 2, 1, 5, 6, 3, 8],
        [5, 2, 8, 6, 3, 9, 4, 1, 7],
      ],
    },
    output: "valid",
  },
  {
    id: 1,
    input: {
      board: [
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
        [5, 5, 5, 5, 5, 5, 5, 5, 5],
      ],
    },
    output: "not valid",
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      board: [
        [7, 9, 2, 1, 5, 4, 3],
        [6, 4, 3, 8, 2, 7, 1],
        [8, 5, 1, 3, 9, 6, 7],
        [2, 6, 5, 9, 7, 3, 8],
        [4, 8, 9, 5, 6, 1, 2],
        [3, 1, 7, 4, 8, 2, 9],
        [1, 3, 6, 7, 4, 8, 5],
      ],
    },
    error: ErrorEnum.INVALID_INPUT_DIMENSION,
  },
  {
    id: 1,
    input: {
      board: [
        [7, 0, 2, 1, 5, 4, 3, 8, 6],
        [6, 4, 3, 8, 2, 7, 1, 5, 0],
        [8, 5, 1, 3, 0, 6, 7, 2, 4],
        [2, 6, 5, 0, 7, 3, 8, 4, 1],
        [4, 8, 0, 5, 6, 1, 2, 7, 3],
        [3, 1, 7, 4, 8, 2, 0, 6, 5],
        [1, 3, 6, 7, 4, 8, 5, 0, 2],
        [0, 7, 4, 2, 1, 5, 6, 3, 8],
        [5, 2, 8, 6, 3, 0, 4, 1, 7],
      ],
    },
    error: ErrorEnum.INVALID_INPUT_RANGE,
  },
];

describe("test challenge 002", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    expect(solution(input.board)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    expect(() => solution(input.board)).toThrow(error);
  });
});
