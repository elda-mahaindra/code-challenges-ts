import type * as Challenge006 from "../challenges/challenge_006";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge006>(
  "../challenges/challenge_006.ts"
);

const successCases = [
  {
    id: 0,
    input: { N: 5, inputs: "1 -2 -8 4 5" },
    output: 1,
  },
  {
    id: 1,
    input: { N: 3, inputs: "-12 -5 -137" },
    output: -5,
  },
  {
    id: 2,
    input: { N: 6, inputs: "42 -5 12 21 5 24" },
    output: 5,
  },
  {
    id: 3,
    input: { N: 6, inputs: "42 5 12 21 -5 24" },
    output: 5,
  },
  {
    id: 4,
    input: { N: 10, inputs: "-5 -4 -2 12 -40 4 2 18 11 5" },
    output: 2,
  },
];

const failureCases = [
  {
    id: 0,
    input: { N: 3, inputs: "1 -2 -8 4 5" },
    error: ErrorEnum.INVALID_INPUTS,
  },
  {
    id: 1,
    input: { N: -1, inputs: "1 -2 -8 4 5" },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
];

describe("test challenge 006", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { N, inputs } = input;

    expect(solution(N, inputs)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { N, inputs } = input;

    expect(() => solution(N, inputs)).toThrow(error);
  });
});
