import type * as Challenge023 from "../challenges/challenge_023";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge023>(
  "../challenges/challenge_023.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      count: 3,
      decimaryInputs: "A A 12",
    },
    output: "32",
  },
  {
    id: 1,
    input: {
      count: 4,
      decimaryInputs: "9A A2 1A 12",
    },
    output: "234",
  },
  {
    id: 2,
    input: {
      count: 3,
      decimaryInputs: "1AA A2A AA5",
    },
    output: "2345",
  },
  {
    id: 3,
    input: {
      count: 4,
      decimaryInputs: "1 2 3 4",
    },
    output: "A",
  },
  {
    id: 4,
    input: {
      count: 8,
      decimaryInputs: "512 256 128 64 32 16 8 8",
    },
    output: "A24",
  },
  {
    id: 5,
    input: {
      count: 2,
      decimaryInputs: "19 91",
    },
    output: "AA",
  },
  {
    id: 6,
    input: {
      count: 3,
      decimaryInputs: "99A 9A9 A1",
    },
    output: "1AAA",
  },
  {
    id: 7,
    input: {
      count: 4,
      decimaryInputs: "499A 2A1A AA9 911",
    },
    output: "9A3A",
  },
  {
    id: 8,
    input: {
      count: 6,
      decimaryInputs: "123456789 AAA21 AA3A A54A A67A A8A9AAA",
    },
    output: "1344AA18A",
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      count: 10,
      decimaryInputs: "A A 12",
    },
    error: ErrorEnum.OUT_OF_RANGE_COUNT,
  },
  {
    id: 1,
    input: {
      count: 3,
      decimaryInputs: "123456789A A 12",
    },
    error: ErrorEnum.INVALID_DECIMARY,
  },
];

describe("test challenge 023", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { count, decimaryInputs } = input;

    expect(solution(count, decimaryInputs)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { count, decimaryInputs } = input;

    expect(() => solution(count, decimaryInputs)).toThrow(error);
  });
});
