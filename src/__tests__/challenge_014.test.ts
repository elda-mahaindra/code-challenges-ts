import type * as Challenge014 from "../challenges/challenge_014";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge014>(
  "../challenges/challenge_014.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      N: 5,
      dictionary: ["because", "first", "these", "could", "which"],
      letters: "hicquwh",
    },
    output: "which",
  },
  {
    id: 1,
    input: {
      N: 10,
      dictionary: [
        "some",
        "first",
        "potsie",
        "day",
        "could",
        "postie",
        "from",
        "have",
        "back",
        "this",
      ],
      letters: "sopitez",
    },
    output: "potsie",
  },
  {
    id: 2,
    input: {
      N: 10,
      dictionary: [
        "after",
        "repots",
        "user",
        "powers",
        "these",
        "time",
        "know",
        "from",
        "could",
        "people",
      ],
      letters: "tsropwe",
    },
    output: "powers",
  },
  {
    id: 3,
    input: {
      N: 10,
      dictionary: [
        "arrest",
        "rarest",
        "raster",
        "raters",
        "sartre",
        "starer",
        "waster",
        "waters",
        "wrest",
        "wrase",
      ],
      letters: "arwtsre",
    },
    output: "waster",
  },
  {
    id: 4,
    input: {
      N: 5,
      dictionary: ["entire", "tween", "soft", "would", "test"],
      letters: "etiewrn",
    },
    output: "tween",
  },
  {
    id: 5,
    input: {
      N: 5,
      dictionary: ["qzyoq", "azejuy", "kqjsdh", "aeiou", "qsjkdh"],
      letters: "qzaeiou",
    },
    output: "aeiou",
  },
  {
    id: 6,
    input: {
      N: 10,
      dictionary: [
        "after",
        "repots",
        "poowers",
        "powers",
        "these",
        "time",
        "know",
        "from",
        "could",
        "people",
      ],
      letters: "tsropwe",
    },
    output: "powers",
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      N: 0,
      dictionary: ["because", "first", "these", "could", "which"],
      letters: "hicquwh",
    },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
  {
    id: 1,
    input: {
      N: 5,
      dictionary: ["because", "first", "these", "could", "which"],
      letters: "hic",
    },
    error: ErrorEnum.OUT_OF_RANGE_LETTERS,
  },
  {
    id: 2,
    input: {
      N: 5,
      dictionary: ["because", "first", "these"],
      letters: "hicquwh",
    },
    error: ErrorEnum.INVALID_DICTIONARY,
  },
  {
    id: 3,
    input: {
      N: 5,
      dictionary: [
        "becausebecausebecausebecausebecause",
        "first",
        "these",
        "could",
        "which",
      ],
      letters: "hicquwh",
    },
    error: ErrorEnum.OUT_OF_RANGE_WORD,
  },
];

describe("test challenge 014", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { N, dictionary, letters } = input;

    expect(solution(N, dictionary, letters)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { N, dictionary, letters } = input;

    expect(() => solution(N, dictionary, letters)).toThrow(error);
  });
});
