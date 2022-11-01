import type * as Challenge025 from "../challenges/challenge_025";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge025>(
  "../challenges/challenge_025.ts"
);

const successCases = [
  {
    id: 0,
    input: { side: 3, diameter: 1 },
    output: 2,
  },
  {
    id: 1,
    input: { side: 12, diameter: 3 },
    output: 4,
  },
  {
    id: 2,
    input: { side: 12, diameter: 6 },
    output: 0,
  },
  {
    id: 3,
    input: { side: 12, diameter: 5 },
    output: 3,
  },
  {
    id: 4,
    input: { side: 30, diameter: 3.25 },
    output: 27,
  },
  {
    id: 5,
    input: { side: 6, diameter: 3.1 },
    output: 3,
  },
  {
    id: 6,
    input: { side: 14, diameter: 4 },
    output: 6,
  },
  {
    id: 7,
    input: { side: 34.8, diameter: 2.5 },
    output: 77,
  },
  {
    id: 8,
    input: { side: 99.99, diameter: 5.001 },
    output: 147,
  },
  {
    id: 9,
    input: { side: 89.89, diameter: 45.5 },
    output: 3,
  },
  {
    id: 10,
    input: { side: 11.99, diameter: 4 },
    output: 7,
  },
  {
    id: 11,
    input: { side: 96.5, diameter: 2.2 },
    output: 600,
  },
  {
    id: 12,
    input: { side: 0.95, diameter: 0.215 },
    output: 8,
  },
  {
    id: 13,
    input: { side: 98.95, diameter: 0.215 },
    output: 58089,
  },
];

const failureCases = [
  {
    id: 0,
    input: { side: 3, diameter: 0 },
    error: ErrorEnum.OUT_OF_RANGE_DIAMETER,
  },
  {
    id: 1,
    input: { side: 100, diameter: 1 },
    error: ErrorEnum.OUT_OF_RANGE_SIDE,
  },
];

describe("test challenge 025", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { side, diameter } = input;

    expect(solution(side, diameter)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { side, diameter } = input;

    expect(() => solution(side, diameter)).toThrow(error);
  });
});
