import type * as Challenge026 from "../challenges/challenge_026";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge026>(
  "../challenges/challenge_026.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      s: "Hello world",
      changeCount: 4,
      rawChanges: ["0|11|!", "0|5|,\\n", "0|7| w", "0|10|\\n"],
    },
    output: ["Hello,", " w worl", "d!"],
  },
  {
    id: 1,
    input: {
      s: "He said that . To which I replied .",
      changeCount: 2,
      rawChanges: ["0|13|I'm not good enough for the job", '0|34|"Your lose!"'],
    },
    output: [
      'He said that I\'m not good enough for the job. To which I replied "Your lose!".',
    ],
  },
  {
    id: 2,
    input: {
      s: "main\\nHello World}",
      changeCount: 4,
      rawChanges: [
        "0|0|void ",
        '1|0|  Console.WriteLine("',
        "0|4|()\\n{",
        '1|11|");\\n',
      ],
    },
    output: ["void main()", "{", '  Console.WriteLine("Hello World");', "}"],
  },
  {
    id: 3,
    input: {
      s: '",,,\\n"\\n-',
      changeCount: 5,
      rawChanges: [
        "0|1|You've gotta dance like there's nobody watching",
        "0|2|\\nLove like you'll\\nnever be hurt",
        "0|3|\\nSing like there's nobody listening",
        "1|0|And live like it's heaven on earth.",
        "2|1| William W. Purkey",
      ],
    },
    output: [
      "\"You've gotta dance like there's nobody watching,",
      "Love like you'll",
      "never be hurt,",
      "Sing like there's nobody listening,",
      "And live like it's heaven on earth.\"",
      "- William W. Purkey",
    ],
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      s: "",
      changeCount: 4,
      rawChanges: ["0|11|!", "0|5|,\\n", "0|7| w", "0|10|\\n"],
    },
    error: ErrorEnum.OUT_OF_RANGE_S,
  },
  {
    id: 1,
    input: {
      s: "Hello world",
      changeCount: 11,
      rawChanges: ["0|11|!", "0|5|,\\n", "0|7| w", "0|10|\\n"],
    },
    error: ErrorEnum.OUT_OF_RANGE_CHANGE_COUNT,
  },
  {
    id: 2,
    input: {
      s: "Hello world",
      changeCount: 4,
      rawChanges: ["0|11|!", "0|5|,\\n", "0|7| w"],
    },
    error: ErrorEnum.INVALID_RAW_CHANGE,
  },
  {
    id: 3,
    input: {
      s: "Hello world",
      changeCount: 4,
      rawChanges: ["0|11|!", "0|5|,\\n", "0|7| w", "0|10"],
    },
    error: ErrorEnum.INVALID_RAW_CHANGE,
  },
  {
    id: 4,
    input: {
      s: "Hello world",
      changeCount: 4,
      rawChanges: ["0|_|!", "0|5|,\\n", "0|7| w", "0|10|\\n"],
    },
    error: ErrorEnum.INVALID_RAW_CHANGE,
  },
];

describe("test challenge 026", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { s, changeCount, rawChanges } = input;

    expect(solution(s, changeCount, rawChanges)).toEqual(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { s, changeCount, rawChanges } = input;

    expect(() => solution(s, changeCount, rawChanges)).toThrow(error);
  });
});
