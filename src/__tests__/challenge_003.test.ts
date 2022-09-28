import type * as Challenge003 from "../challenges/challenge_003";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge003>(
  "../challenges/challenge_003.ts"
);

const successCases = [
  {
    input: { h: 5, n: 1 },
    output: [
      "..../\\....",
      ".../..\\...",
      "../....\\..",
      "./......\\.",
      "/........\\",
    ],
  },
  {
    input: { h: 5, n: 2 },
    output: [
      "..../\\......../\\....",
      ".../..\\....../..\\...",
      "../....\\..../....\\..",
      "./......\\../......\\.",
      "/........\\/........\\",
    ],
  },
  {
    input: { h: 10, n: 1 },
    output: [
      "........./\\.........",
      "......../..\\........",
      "......./....\\.......",
      "....../......\\......",
      "...../........\\.....",
      "..../..........\\....",
      ".../............\\...",
      "../..............\\..",
      "./................\\.",
      "/..................\\",
    ],
  },
  {
    input: { h: 3, n: 6 },
    output: [
      "../\\..../\\..../\\..../\\..../\\..../\\..",
      "./..\\../..\\../..\\../..\\../..\\../..\\.",
      "/....\\/....\\/....\\/....\\/....\\/....\\",
    ],
  },
];

const failureCases = [
  {
    input: { h: 1, n: 1 },
    error: ErrorEnum.OUT_OF_RANGE_H,
  },
  {
    input: { h: 51, n: 1 },
    error: ErrorEnum.OUT_OF_RANGE_H,
  },
  {
    input: { h: 5, n: 0 },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
  {
    input: { h: 5, n: 11 },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
];

describe("test challenge 003", () => {
  it.each(successCases)(
    // "test sumAll($input) should result $output",
    "returns '$output' when h = '$input.h' and n = '$input.n'",
    ({ input, output }) => {
      const { h, n } = input;

      expect(solution(h, n)).toEqual(output);
    }
  );

  it.each(failureCases)(
    // "test sumAll($input) should result $output",
    "throws an error '$error' when h = '$input.h' and n = '$input.n'",
    ({ input, error }) => {
      const { h, n } = input;

      expect(() => solution(h, n)).toThrow(error);
    }
  );
});
