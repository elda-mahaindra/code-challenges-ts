import type * as Challenge021 from "../challenges/challenge_021";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge021>(
  "../challenges/challenge_021.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      n: 2,
      rows: ["A B", "C D"],
      message: "CBA",
    },
    output: "100100",
  },
  {
    id: 1,
    input: {
      n: 3,
      rows: ["A B C D E F G H I", "J K L M N O P Q R", "S T U V W X Y Z"],
      message: "HELLOWORLD",
    },
    output: "07041212152415181203",
  },
  {
    id: 2,
    input: {
      n: 7,
      rows: [
        "Z Y X W",
        "V U T S",
        "R Q P O",
        "N M L K",
        "J I H G",
        "F E D C",
        "B A",
      ],
      message: "HELLOWORLD",
    },
    output: "42513232230323203252",
  },
  {
    id: 3,
    input: {
      n: 6,
      rows: [
        "H U P N I",
        "J W C F T",
        "B Z A Q Y",
        "L O S X R",
        "M E V D G",
        "K # @ ! ?",
      ],
      message: "SXD@OE?AR",
    },
    output: "323343523141542234",
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      n: 11,
      rows: ["A B", "C D"],
      message: "CBA",
    },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
  {
    id: 1,
    input: {
      n: 3,
      rows: ["A B", "C D"],
      message: "CBA",
    },
    error: ErrorEnum.INVALID_ROWS,
  },
  {
    id: 2,
    input: {
      n: 2,
      rows: ["AB", "C D"],
      message: "CBA",
    },
    error: ErrorEnum.INVALID_ROWS,
  },
];

describe("test challenge 021", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { n, rows, message } = input;

    expect(solution(n, rows, message)).toBe(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { n, rows, message } = input;

    expect(() => solution(n, rows, message)).toThrow(error);
  });
});
