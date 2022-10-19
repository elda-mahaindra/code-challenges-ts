import type * as Challenge012 from "../challenges/challenge_012";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge012>(
  "../challenges/challenge_012.ts"
);

const successCases = [
  {
    id: 0,
    input: { message: "C" },
    output: "0 0 00 0000 0 00",
  },
  {
    id: 1,
    input: { message: "CC" },
    output: "0 0 00 0000 0 000 00 0000 0 00",
  },
  {
    id: 2,
    input: { message: "%" },
    output: "00 0 0 0 00 00 0 0 00 0 0 0",
  },
  {
    id: 3,
    input: { message: "Chuck Norris' keyboard has 2 keys: 0 and white space." },
    output:
      "0 0 00 0000 0 0000 00 0 0 0 00 000 0 000 00 0 0 0 00 0 0 000 00 000 0 0000 00 0 0 0 00 0 0 00 00 0 0 0 00 00000 0 0 00 00 0 000 00 0 0 00 00 0 0 0000000 00 00 0 0 00 0 0 000 00 00 0 0 00 0 0 00 00 0 0 0 00 00 0 0000 00 00 0 00 00 0 0 0 00 00 0 000 00 0 0 0 00 00000 0 00 00 0 0 0 00 0 0 0000 00 00 0 0 00 0 0 00000 00 00 0 000 00 000 0 0 00 0 0 00 00 0 0 000000 00 0000 0 0000 00 00 0 0 00 0 0 00 00 00 0 0 00 000 0 0 00 00000 0 00 00 0 0 0 00 000 0 00 00 0000 0 0000 00 00 0 00 00 0 0 0 00 000000 0 00 00 00 0 0 00 00 0 0 00 00000 0 00 00 0 0 0 00 0 0 0000 00 00 0 0 00 0 0 00000 00 00 0 0000 00 00 0 00 00 0 0 000 00 0 0 0 00 00 0 0 00 000000 0 00 00 00000 0 0 00 00000 0 00 00 0000 0 000 00 0 0 000 00 0 0 00 00 00 0 0 00 000 0 0 00 00000 0 000 00 0 0 00000 00 0 0 0 00 000 0 00 00 0 0 0 00 00 0 0000 00 0 0 0 00 00 0 00 00 00 0 0 00 0 0 0 00 0 0 0 00 00000 0 000 00 00 0 00000 00 0000 0 00 00 0000 0 000 00 000 0 0000 00 00 0 0 00 0 0 0 00 0 0 0 00 0 0 000 00 0",
  },
];

const failureCases = [
  {
    id: 0,
    input: { message: "" },
    error: ErrorEnum.OUT_OF_RANGE_MESSAGE,
  },
];

describe("test challenge 012", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    expect(solution(input.message)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    expect(() => solution(input.message)).toThrow(error);
  });
});
