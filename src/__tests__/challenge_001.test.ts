// 'requireActual' ensures you get the real file instead of an automock
// also use import type and <typeof ...> to still get types
import type * as Challenge001 from "../challenges/challenge_001";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge001>(
  "../challenges/challenge_001.ts"
);

const successCases = [
  {
    input: { s: "abcddefda1111133333333" },
    output: "d",
  },
  {
    input: { s: "AA0AB0BB0ccc0aa0aw00wo0BBBw123123" },
    output: "B",
  },
  {
    input: { s: "aaaaaaaaaaaBCGDhsjwnq" },
    output: "a",
  },
];

const failureCases = [
  {
    input: { s: "0000000012312313123" },
    error: ErrorEnum.ALPHABET_NOT_FOUND,
  },
  {
    input: { s: "" },
    error: ErrorEnum.MIN_LENGTH_REACHED,
  },
  {
    input: {
      s: "zvchW39Kt5mQQLXXE8IekkBAVOjwRVaKaHGwSI44uuJ005n1luXnfwW8pBW7S1ujXdrintWaZ7nK6dBsjch4BRPYazB2kdcAgfZak",
    },
    error: ErrorEnum.MAX_LENGTH_REACHED,
  },
];

describe("test challenge 001", () => {
  it.each(successCases)(
    "returns '$output' when s = '$input.s'",
    ({ input, output }) => {
      expect(solution(input.s)).toBe(output);
    }
  );

  it.each(failureCases)(
    "throws an error '$error' when s = '$input.s'",
    ({ input, error }) => {
      expect(() => solution(input.s)).toThrow(error);
    }
  );
});
