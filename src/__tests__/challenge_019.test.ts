import type * as Challenge019 from "../challenges/challenge_019";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge019>(
  "../challenges/challenge_019.ts"
);

const successCases = [
  {
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
    input: {
      operation: "ENCODE",
      pseudoRandomNumber: 4,
      rotors: ["BDFHJLCPRTXVZNYEIWGAKMUSQO", "AJDKSIRUXBLHWTMCQGZNPYFVOE"],
      message: "AAA",
    },
    error: ErrorEnum.OUT_OF_RANGE_ROTORS,
  },
  {
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
  it.each(successCases)(
    // "test sumAll($input) should result $output",
    "returns '$output' when operation = '$input.operation', pseudoRandomNumber = '$input.pseudoRandomNumber', rotors = '$input.rotors', and message = '$input.message'",
    ({ input, output }) => {
      const { operation, pseudoRandomNumber, rotors, message } = input;

      expect(
        solution(
          operation as "ENCODE" | "DECODE",
          pseudoRandomNumber,
          rotors,
          message
        )
      ).toBe(output);
    }
  );

  it.each(failureCases)(
    // "test sumAll($input) should result $output",
    "throws an error '$error' when operation = '$input.operation', pseudoRandomNumber = '$input.pseudoRandomNumber', rotors = '$input.rotors', and message = '$input.message'",
    ({ input, error }) => {
      const { operation, pseudoRandomNumber, rotors, message } = input;

      expect(() =>
        solution(
          operation as "ENCODE" | "DECODE",
          pseudoRandomNumber,
          rotors,
          message
        )
      ).toThrow(error);
    }
  );
});
