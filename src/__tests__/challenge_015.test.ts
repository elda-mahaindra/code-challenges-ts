import type * as Challenge015 from "../challenges/challenge_015";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge015>(
  "../challenges/challenge_015.ts"
);

const successCases = [
  {
    id: 0,
    input: { n: 6, values: [3, 2, 4, 2, 1, 5] },
    output: -3,
  },
  {
    id: 1,
    input: { n: 6, values: [5, 3, 4, 2, 3, 1] },
    output: -4,
  },
  {
    id: 2,
    input: { n: 5, values: [1, 2, 4, 4, 5] },
    output: 0,
  },
  {
    id: 3,
    input: { n: 5, values: [3, 4, 7, 9, 10] },
    output: 0,
  },
  {
    id: 4,
    input: { n: 6, values: [3, 2, 10, 7, 15, 14] },
    output: -3,
  },
];

const failureCases = [
  {
    id: 0,
    input: { n: 0, values: [3, 2, 4, 2, 1, 5] },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
  {
    id: 1,
    input: { n: 6, values: [Math.pow(2, 31), 2, 4, 2, 1, 5] },
    error: ErrorEnum.OUT_OF_RANGE_VALUE,
  },
];

describe("test challenge 015", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { n, values } = input;

    expect(solution(n, values)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { n, values } = input;

    expect(() => solution(n, values)).toThrow(error);
  });
});
