import type * as Challenge010 from "../challenges/challenge_010";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge010>(
  "../challenges/challenge_010.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      forest: [
        // prettier-ignore
        '######',
        "######",
        "######",
        "######",
        "######",
        "******",
      ],
    },
    output: 12,
  },
  {
    id: 1,
    input: {
      forest: [
        // prettier-ignore
        '######',
        "######",
        "######",
        "######",
        "======",
        "******",
      ],
    },
    output: 6,
  },
  {
    id: 2,
    input: {
      forest: [
        // prettier-ignore
        '======',
        "======",
        "==*===",
        "======",
        "======",
        "======",
      ],
    },
    output: "JUST RUN",
  },
  {
    id: 3,
    input: {
      forest: [
        // prettier-ignore
        '######',
        "######",
        "######",
        "##*###",
        "######",
        "######",
      ],
    },
    output: 24,
  },
  {
    id: 4,
    input: {
      forest: [
        // prettier-ignore
        '******',
        "oooooo",
        "oooooo",
        "oooooo",
        "oooooo",
        "oooooo",
      ],
    },
    output: "JUST RUN",
  },
  {
    id: 5,
    input: {
      forest: [
        // prettier-ignore
        '******',
        "#*****",
        "******",
        "******",
        "******",
        "*****#",
      ],
    },
    output: "JUST RUN",
  },
  {
    id: 6,
    input: {
      forest: [
        // prettier-ignore
        '#o##o#',
        "#o*#o#",
        "*o##o*",
        "#o##o#",
        "#o**o#",
        "#o##o#",
      ],
    },
    output: "JUST RUN",
  },
  {
    id: 7,
    input: {
      forest: [
        // prettier-ignore
        '======',
        "=###==",
        "======",
        "=###==",
        "==oo==",
        "======",
      ],
    },
    output: "RELAX",
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      forest: [
        // prettier-ignore
        "#####",
        "#####",
        "#####",
        "#####",
        "*****",
      ],
    },
    error: ErrorEnum.INVALID_FOREST,
  },
];

describe("test challenge 010", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    expect(solution(input.forest)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    expect(() => solution(input.forest)).toThrow(error);
  });
});
