import type * as Challenge003 from "../challenges/challenge_003";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge003>(
  "../challenges/challenge_003.ts"
);

const successCases = [
  {
    id: 0,
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 0,
    input: { h: 1, n: 1 },
    error: ErrorEnum.OUT_OF_RANGE_H,
  },
  {
    id: 1,
    input: { h: 51, n: 1 },
    error: ErrorEnum.OUT_OF_RANGE_H,
  },
  {
    id: 2,
    input: { h: 5, n: 0 },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
  {
    id: 3,
    input: { h: 5, n: 11 },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
];

describe("test challenge 003", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { h, n } = input;

    expect(solution(h, n)).toEqual(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { h, n } = input;

    expect(() => solution(h, n)).toThrow(error);
  });
});
