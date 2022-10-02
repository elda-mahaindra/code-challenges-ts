import type * as Challenge012 from "../challenges/challenge_012";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge012>(
  "../challenges/challenge_012.ts"
);

const successCases = [
  {
    input: { message: "C" },
    output: "0 0 00 0000 0 00",
  },
  {
    input: { message: "CC" },
    output: "0 0 00 0000 0 000 00 0000 0 00",
  },
  {
    input: { message: "%" },
    output: "00 0 0 0 00 00 0 0 00 0 0 0",
  },
  {
    input: { message: "Chuck Norris' keyboard has 2 keys: 0 and white space." },
    output:
      "0 0 00 0000 0 0000 00 0 0 0 00 000 0 000 00 0 0 0 00 0 0 000 00 000 0 0000 00 0 0 0 00 0 0 00 00 0 0 0 00 00000 0 0 00 00 0 000 00 0 0 00 00 0 0 0000000 00 00 0 0 00 0 0 000 00 00 0 0 00 0 0 00 00 0 0 0 00 00 0 0000 00 00 0 00 00 0 0 0 00 00 0 000 00 0 0 0 00 00000 0 00 00 0 0 0 00 0 0 0000 00 00 0 0 00 0 0 00000 00 00 0 000 00 000 0 0 00 0 0 00 00 0 0 000000 00 0000 0 0000 00 00 0 0 00 0 0 00 00 00 0 0 00 000 0 0 00 00000 0 00 00 0 0 0 00 000 0 00 00 0000 0 0000 00 00 0 00 00 0 0 0 00 000000 0 00 00 00 0 0 00 00 0 0 00 00000 0 00 00 0 0 0 00 0 0 0000 00 00 0 0 00 0 0 00000 00 00 0 0000 00 00 0 00 00 0 0 000 00 0 0 0 00 00 0 0 00 000000 0 00 00 00000 0 0 00 00000 0 00 00 0000 0 000 00 0 0 000 00 0 0 00 00 00 0 0 00 000 0 0 00 00000 0 000 00 0 0 00000 00 0 0 0 00 000 0 00 00 0 0 0 00 00 0 0000 00 0 0 0 00 00 0 00 00 00 0 0 00 0 0 0 00 0 0 0 00 00000 0 000 00 00 0 00000 00 0000 0 00 00 0000 0 000 00 000 0 0000 00 00 0 0 00 0 0 0 00 0 0 0 00 0 0 000 00 0",
  },
];

const failureCases = [
  {
    input: { message: "" },
    error: ErrorEnum.OUT_OF_RANGE_MESSAGE,
  },
];

describe("test challenge 012", () => {
  it.each(successCases)(
    "returns '$output' when message = '$input.message'",
    ({ input, output }) => {
      expect(solution(input.message)).toBe(output);
    }
  );

  it.each(failureCases)(
    "throws an error '$error' when message = '$input.message'",
    ({ input, error }) => {
      expect(() => solution(input.message)).toThrow(error);
    }
  );
});
