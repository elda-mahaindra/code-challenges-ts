import type * as Challenge009 from "../challenges/challenge_009";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge009>(
  "../challenges/challenge_009.ts"
);

const successCases = [
  {
    input: {
      w: 16,
      h: 9,
      lines: [
        "................",
        "................",
        "................",
        "................",
        "................",
        "....x...........",
        "................",
        "................",
        "................",
      ],
    },
    output: [
      "................",
      "................",
      "................",
      "................",
      "...111..........",
      "...1.1..........",
      "...111..........",
      "................",
      "................",
    ],
  },
  {
    input: {
      w: 10,
      h: 7,
      lines: [
        "..........",
        ".x...x...x",
        "..x......x",
        ".....x....",
        "..x.x...x.",
        "x.........",
        ".x...x...x",
      ],
    },
    output: [
      "111.111.11",
      "1.211.1.2.",
      "12.1222.2.",
      ".2232.1122",
      "12.2.211.1",
      ".322221122",
      "2.1.1.1.1.",
    ],
  },
  {
    input: {
      w: 16,
      h: 11,
      lines: [
        "..xxxxxx..x.x...",
        ".xx...xxx....xxx",
        "x.xxxx.xxx...xxx",
        "xxxxxxxxxx..xxxx",
        "...xx..x..xxxx..",
        "xx.xx.xxxx..x...",
        "xxxxxx.....x..xx",
        "xx......xxx..xxx",
        "xxxxxxxxxxxxxxxx",
        "xxx.xxx......xx.",
        "........xxxxxxxx",
      ],
    },
    output: [
      "13......32.2.332",
      "2..766...4223...",
      ".7....7...214...",
      "..........44....",
      "456..66.75....42",
      "..6..5....45.432",
      "......34554.34..",
      "..766544...55...",
      "................",
      "...5...556667..5",
      "23222322........",
    ],
  },
  {
    input: {
      w: 26,
      h: 12,
      lines: [
        "..........................",
        "..........................",
        "..........................",
        "..........................",
        "..........................",
        "..........................",
        "..........................",
        "..........................",
        "..........................",
        "..........................",
        "..........................",
        "..........................",
      ],
    },
    output: [
      "..........................",
      "..........................",
      "..........................",
      "..........................",
      "..........................",
      "..........................",
      "..........................",
      "..........................",
      "..........................",
      "..........................",
      "..........................",
      "..........................",
    ],
  },
];

const failureCases = [
  {
    input: {
      w: 0,
      h: 9,
      lines: [
        "................",
        "................",
        "................",
        "................",
        "................",
        "....x...........",
        "................",
        "................",
        "................",
      ],
    },
    error: ErrorEnum.OUT_OF_RANGE_W,
  },
  {
    input: {
      w: 16,
      h: 0,
      lines: [
        "................",
        "................",
        "................",
        "................",
        "................",
        "....x...........",
        "................",
        "................",
        "................",
      ],
    },
    error: ErrorEnum.OUT_OF_RANGE_H,
  },
  {
    input: {
      w: 16,
      h: 9,
      lines: [
        "................",
        "................",
        "................",
        "................",
        "................",
        "....x...........",
        "................",
        "................",
      ],
    },
    error: ErrorEnum.INVALID_LINES,
  },
  {
    input: {
      w: 16,
      h: 9,
      lines: [
        "................",
        "................",
        "................",
        "................",
        "................",
        "....x...........",
        "................",
        "................",
        "........",
      ],
    },
    error: ErrorEnum.INVALID_LINE,
  },
];

describe("test challenge 009", () => {
  it.each(successCases)(
    "returns '$output' when w = '$input.w', h = '$input.h', and lines = '$input.lines'",
    ({ input, output }) => {
      const { w, h, lines } = input;

      expect(solution(w, h, lines)).toEqual(output);
    }
  );

  it.each(failureCases)(
    "throws an error '$error' when w = '$input.w', h = '$input.h', and lines = '$input.lines'",
    ({ input, error }) => {
      const { w, h, lines } = input;

      expect(() => solution(w, h, lines)).toThrow(error);
    }
  );
});