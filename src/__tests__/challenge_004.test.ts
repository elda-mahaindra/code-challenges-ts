import type * as Challenge004 from "../challenges/challenge_004";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge004>(
  "../challenges/challenge_004.ts"
);

const successCases = [
  {
    id: 0,
    input: { lightX: 3, lightY: 8, initialTx: 3, initialTy: 6 },
    output: "S S",
  },
  {
    id: 1,
    input: { lightX: 3, lightY: 6, initialTx: 3, initialTy: 8 },
    output: "N N",
  },
  {
    id: 2,
    input: { lightX: 31, lightY: 4, initialTx: 5, initialTy: 4 },
    output: "E E E E E E E E E E E E E E E E E E E E E E E E E E",
  },
  {
    id: 3,
    input: { lightX: 31, lightY: 4, initialTx: 31, initialTy: 17 },
    output: "N N N N N N N N N N N N N",
  },
  {
    id: 4,
    input: { lightX: 0, lightY: 17, initialTx: 31, initialTy: 4 },
    output:
      "SW SW SW SW SW SW SW SW SW SW SW SW SW W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W W",
  },
  {
    id: 5,
    input: { lightX: 36, lightY: 17, initialTx: 0, initialTy: 0 },
    output:
      "SE SE SE SE SE SE SE SE SE SE SE SE SE SE SE SE SE E E E E E E E E E E E E E E E E E E E E E E E E E E E E E E E E E E E E",
  },
];

const failureCases = [
  {
    id: 0,
    input: { lightX: -1, lightY: 8, initialTx: 3, initialTy: 6 },
    error: ErrorEnum.OUT_OF_RANGE_LIGHT_X,
  },
  {
    id: 1,
    input: { lightX: 3, lightY: -1, initialTx: 3, initialTy: 6 },
    error: ErrorEnum.OUT_OF_RANGE_LIGHT_Y,
  },
  {
    id: 2,
    input: { lightX: 3, lightY: 8, initialTx: -1, initialTy: 6 },
    error: ErrorEnum.OUT_OF_RANGE_INITIAL_TX,
  },
  {
    id: 3,
    input: { lightX: 3, lightY: 8, initialTx: 3, initialTy: -1 },
    error: ErrorEnum.OUT_OF_RANGE_INITIAL_TY,
  },
];

describe("test challenge 004", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { lightX, lightY, initialTx, initialTy } = input;

    expect(solution(lightX, lightY, initialTx, initialTy)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { lightX, lightY, initialTx, initialTy } = input;

    expect(() => solution(lightX, lightY, initialTx, initialTy)).toThrow(error);
  });
});
