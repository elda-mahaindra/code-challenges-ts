import type * as Challenge010 from "../challenges/challenge_010";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge010>(
  "../challenges/challenge_010.ts"
);

const successCases = [
  {
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
  it.each(successCases)(
    "returns '$output' when forest = '$input.forest'",
    ({ input, output }) => {
      expect(solution(input.forest)).toBe(output);
    }
  );

  it.each(failureCases)(
    "throws an error '$error' when forest = '$input.forest'",
    ({ input, error }) => {
      expect(() => solution(input.forest)).toThrow(error);
    }
  );
});
