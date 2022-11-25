// 'requireActual' ensures you get the real file instead of an automock
// also use import type and <typeof ...> to still get types
import type * as Challenge001 from "../challenges/challenge_001";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge001>(
  "../challenges/challenge_001.ts"
);

const successCases = [
  {
    id: 0,
    input: { s: "abcddefda1111133333333" },
    output: "d",
  },
  {
    id: 1,
    input: { s: "AA0AB0BB0ccc0aa0aw00wo0BBBw123123" },
    output: "B",
  },
  {
    id: 2,
    input: { s: "aaaaaaaaaaaBCGDhsjwnq" },
    output: "a",
  },
];

const failureCases = [
  {
    id: 0,
    input: { s: "0000000000000012312313123" },
    error: ErrorEnum.INVALID_S,
  },
  {
    id: 1,
    input: { s: "" },
    error: ErrorEnum.OUT_OF_RANGE_S,
  },
];

describe("test challenge 001", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    expect(solution(input.s)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    expect(() => solution(input.s)).toThrow(error);
  });
});
