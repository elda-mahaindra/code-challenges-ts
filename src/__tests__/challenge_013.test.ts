import type * as Challenge013 from "../challenges/challenge_013";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge013>(
  "../challenges/challenge_013.ts"
);

const successCases = [
  {
    input: { width: 2, height: 2, lines: ["00", "0."] },
    output: ["0 0 1 0 0 1", "1 0 -1 -1 -1 -1", "0 1 -1 -1 -1 -1"],
  },
  {
    input: { width: 5, height: 1, lines: ["0.0.0"] },
    output: ["0 0 2 0 -1 -1", "2 0 4 0 -1 -1", "4 0 -1 -1 -1 -1"],
  },
  {
    input: { width: 1, height: 4, lines: ["0", "0", "0", "0"] },
    output: [
      "0 0 -1 -1 0 1",
      "0 1 -1 -1 0 2",
      "0 2 -1 -1 0 3",
      "0 3 -1 -1 -1 -1",
    ],
  },
  {
    input: { width: 3, height: 3, lines: ["0.0", "...", "0.0"] },
    output: [
      "0 0 2 0 0 2",
      "2 0 -1 -1 2 2",
      "0 2 2 2 -1 -1",
      "2 2 -1 -1 -1 -1",
    ],
  },
  {
    input: { width: 3, height: 3, lines: ["000", ".0.", ".0."] },
    output: [
      "0 0 1 0 -1 -1",
      "1 0 2 0 1 1",
      "2 0 -1 -1 -1 -1",
      "1 1 -1 -1 1 2",
      "1 2 -1 -1 -1 -1",
    ],
  },
  {
    input: { width: 4, height: 4, lines: ["0...", ".0..", "..0.", "...0"] },
    output: [
      "0 0 -1 -1 -1 -1",
      "1 1 -1 -1 -1 -1",
      "2 2 -1 -1 -1 -1",
      "3 3 -1 -1 -1 -1",
    ],
  },
  {
    input: { width: 4, height: 4, lines: ["00.0", "0.00", ".0.0", "000."] },
    output: [
      "0 0 1 0 0 1",
      "1 0 3 0 1 2",
      "3 0 -1 -1 3 1",
      "0 1 2 1 0 3",
      "2 1 3 1 2 3",
      "3 1 -1 -1 3 2",
      "1 2 3 2 1 3",
      "3 2 -1 -1 -1 -1",
      "0 3 1 3 -1 -1",
      "1 3 2 3 -1 -1",
      "2 3 -1 -1 -1 -1",
    ],
  },
  {
    input: {
      width: 7,
      height: 7,
      lines: [
        "..0....",
        ".......",
        "..0.0.0",
        ".......",
        "0.0.0..",
        ".......",
        "....0..",
      ],
    },
    output: [
      "2 0 -1 -1 2 2",
      "2 2 4 2 2 4",
      "4 2 6 2 4 4",
      "6 2 -1 -1 -1 -1",
      "0 4 2 4 -1 -1",
      "2 4 4 4 -1 -1",
      "4 4 -1 -1 4 6",
      "4 6 -1 -1 -1 -1",
    ],
  },
];

const failureCases = [
  {
    input: { width: 0, height: 2, lines: ["00", "0."] },
    error: ErrorEnum.OUT_OF_RANGE_WIDTH,
  },
  {
    input: { width: 2, height: 0, lines: ["00", "0."] },
    error: ErrorEnum.OUT_OF_RANGE_HEIGHT,
  },
  {
    input: { width: 2, height: 2, lines: ["0", "0."] },
    error: ErrorEnum.INVALID_GRID_WIDTH,
  },
  {
    input: { width: 2, height: 2, lines: ["00"] },
    error: ErrorEnum.INVALID_GRID_HEIGHT,
  },
];

describe("test challenge 013", () => {
  it.each(successCases)(
    "returns '$output' when width = '$input.width', height = '$input.height' and lines = '$input.lines'",
    ({ input, output }) => {
      const { width, height, lines } = input;

      expect(solution(width, height, lines)).toEqual(output);
    }
  );

  it.each(failureCases)(
    "throws an error '$error' when width = '$input.width', height = '$input.height' and lines = '$input.lines'",
    ({ input, error }) => {
      const { width, height, lines } = input;

      expect(() => solution(width, height, lines)).toThrow(error);
    }
  );
});
