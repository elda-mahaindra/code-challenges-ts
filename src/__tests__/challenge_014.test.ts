import type * as Challenge014 from "../challenges/challenge_014";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge014>(
  "../challenges/challenge_014.ts"
);

const successCases = [
  {
    input: {
      N: 5,
      dictionary: ["because", "first", "these", "could", "which"],
      letters: "hicquwh",
    },
    output: "which",
  },
  {
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
    input: {
      N: 5,
      dictionary: ["entire", "tween", "soft", "would", "test"],
      letters: "etiewrn",
    },
    output: "tween",
  },
  {
    input: {
      N: 5,
      dictionary: ["qzyoq", "azejuy", "kqjsdh", "aeiou", "qsjkdh"],
      letters: "qzaeiou",
    },
    output: "aeiou",
  },
  {
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
    input: {
      N: 0,
      dictionary: ["because", "first", "these", "could", "which"],
      letters: "hicquwh",
    },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
  {
    input: {
      N: 5,
      dictionary: ["because", "first", "these", "could", "which"],
      letters: "hic",
    },
    error: ErrorEnum.OUT_OF_RANGE_LETTERS,
  },
  {
    input: {
      N: 5,
      dictionary: ["because", "first", "these"],
      letters: "hicquwh",
    },
    error: ErrorEnum.INVALID_DICTIONARY,
  },
  {
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
  it.each(successCases)(
    "returns '$output' when N = '$input.N', dictionary = '$input.dictionary' and letters = '$input.letters'",
    ({ input, output }) => {
      const { N, dictionary, letters } = input;

      expect(solution(N, dictionary, letters)).toBe(output);
    }
  );

  it.each(failureCases)(
    "throws an error '$error' when N = '$input.N', dictionary = '$input.dictionary' and letters = '$input.letters'",
    ({ input, error }) => {
      const { N, dictionary, letters } = input;

      expect(() => solution(N, dictionary, letters)).toThrow(error);
    }
  );
});
