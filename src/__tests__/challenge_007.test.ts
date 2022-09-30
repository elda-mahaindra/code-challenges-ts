import type * as Challenge007 from "../challenges/challenge_007";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge007>(
  "../challenges/challenge_007.ts"
);

const successCases = [
  {
    input: { N: 3, powers: [5, 8, 9] },
    output: 1,
  },
  {
    input: { N: 10, powers: [5, 15, 17, 3, 8, 11, 28, 6, 55, 7] },
    output: 1,
  },
  {
    input: {
      N: 100,
      powers: [
        9999999, 9999888, 9999741, 9999653, 9999595, 9999444, 9999387, 9999241,
        9999140, 9999042, 9998937, 9998837, 9998724, 9998609, 9998475, 9998391,
        9998321, 9998187, 9998070, 9997991, 9997902, 9997822, 9997767, 9997712,
        9997651, 9997540, 9997406, 9997308, 9997210, 9997133, 9997041, 9996946,
        9996841, 9996705, 9996655, 9996515, 9996379, 9996277, 9996141, 9996013,
        9995910, 9995783, 9995638, 9995528, 9995474, 9995362, 9995304, 9995236,
        9995171, 9995123, 9994973, 9994860, 9994798, 9994682, 9994571, 9994473,
        9994337, 9994231, 9994159, 9994057, 9993936, 9993889, 9993744, 9993609,
        9993469, 9993353, 9993268, 9993219, 9993162, 9993016, 9992897, 9992803,
        9992721, 9992630, 9992513, 9992414, 9992326, 9992279, 9992139, 9991988,
        9991872, 9991770, 9991671, 9991560, 9991477, 9991383, 9991324, 9991220,
        9991071, 9991011, 9990928, 9990786, 9990668, 9990558, 9990487, 9990364,
        9990225, 9990156, 9990082, 9989943,
      ],
    },
    output: 47,
  },
];

const failureCases = [
  {
    input: { N: -1, powers: [5, 8, 9] },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
  {
    input: { N: 2, powers: [5, 8, 9] },
    error: ErrorEnum.INVALID_POWERS,
  },
  {
    input: { N: 3, powers: [5, 8, -9] },
    error: ErrorEnum.OUT_OF_RANGE_P,
  },
];

describe("test challenge 007", () => {
  it.each(successCases)(
    "returns '$output' when N = '$input.N' and powers = '$input.powers'",
    ({ input, output }) => {
      const { N, powers } = input;

      expect(solution(N, powers)).toBe(output);
    }
  );

  it.each(failureCases)(
    "throws an error '$error' when N = '$input.N' and powers = '$input.powers'",
    ({ input, error }) => {
      const { N, powers } = input;

      expect(() => solution(N, powers)).toThrow(error);
    }
  );
});
