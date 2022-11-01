import type * as Challenge019 from "../challenges/challenge_019";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge019>(
  "../challenges/challenge_019.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 4,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "AAA",
    },
    output: "KQF",
  },
  {
    id: 1,
    input: {
      operation: "DECODE",
      pseudoRandomNumber: 4,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "KQF",
    },
    output: "AAA",
  },
  {
    id: 2,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 25,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "AAA",
    },
    output: "OZN",
  },
  {
    id: 3,
    input: {
      operation: "DECODE",
      pseudoRandomNumber: 25,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "OZN",
    },
    output: "AAA",
  },
  {
    id: 4,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 4,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "XXX",
    },
    output: "NVA",
  },
  {
    id: 5,
    input: {
      operation: "DECODE",
      pseudoRandomNumber: 4,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "NVA",
    },
    output: "XXX",
  },
  {
    id: 6,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 4,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "YYY",
    },
    output: "VAK",
  },
  {
    id: 7,
    input: {
      operation: "DECODE",
      pseudoRandomNumber: 4,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "VAK",
    },
    output: "YYY",
  },
  {
    id: 8,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 7,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "WEATHERREPORTWINDYTODAY",
    },
    output: "ALWAURKQEQQWLRAWZHUYKVN",
  },
  {
    id: 9,
    input: {
      operation: "DECODE",
      pseudoRandomNumber: 9,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "PQSACVVTOISXFXCIAMQEM",
    },
    output: "EVERYONEISWELCOMEHERE",
  },
  {
    id: 10,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 9,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "EVERYONEISWELCOMEHERE",
    },
    output: "PQSACVVTOISXFXCIAMQEM",
  },
  {
    id: 11,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 9,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "EVERYONEISWELCOMEHEREEVERYONEISWELCOMEHERE",
    },
    output: "PQSACVVTOISXFXCIAMQEMDZIXFJJSTQIENEFQXVZYV",
  },
  {
    id: 12,
    input: {
      operation: "DECODE",
      pseudoRandomNumber: 5,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "XPCXAUPHYQALKJMGKRWPGYHFTKRFFFNOUTZCABUAEHQLGXREZ",
    },
    output: "THEQUICKBROWNFOXJUMPSOVERALAZYSPHINXOFBLACKQUARTZ",
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 26,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "AAA",
    },
    error: ErrorEnum.OUT_OF_RANGE_PSEUDO_RANDOM_NUMBER,
  },
  {
    id: 1,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 4,
      rotors: ["BDFHJLCPRTXVZNYEIWGAKMUSQO", "AJDKSIRUXBLHWTMCQGZNPYFVOE"],
      message: "AAA",
    },
    error: ErrorEnum.OUT_OF_RANGE_ROTORS,
  },
  {
    id: 2,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 4,
      rotors: [
        "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "aaa",
    },
    error: ErrorEnum.INVALID_MESSAGE,
  },
  {
    id: 3,
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 4,
      rotors: [
        "BBBBBBCPRTXVZNYEIWGAKMUSQO",
        "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
      ],
      message: "AAA",
    },
    error: ErrorEnum.INVALID_ROTORS,
  },
];

describe("test challenge 019", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { operation, pseudoRandomNumber, rotors, message } = input;

    expect(
      solution(
        operation as "ENCODE" | "DECODE",
        pseudoRandomNumber,
        rotors,
        message
      )
    ).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { operation, pseudoRandomNumber, rotors, message } = input;

    expect(() =>
      solution(
        operation as "ENCODE" | "DECODE",
        pseudoRandomNumber,
        rotors,
        message
      )
    ).toThrow(error);
  });
});
