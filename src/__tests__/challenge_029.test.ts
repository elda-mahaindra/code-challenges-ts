import type * as Challenge029 from "../challenges/challenge_029";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge029>(
  "../challenges/challenge_029.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      lengthOfLine: 40,
      N: 5,
      entries: [
        "Title1 4",
        ">Subtitle1 5",
        ">>Subsubtitle1 5",
        ">Subtitle2 6",
        "Title2 10",
      ],
    },
    output: [
      "1 Title1...............................4",
      "    1 Subtitle1........................5",
      "        1 Subsubtitle1.................5",
      "    2 Subtitle2........................6",
      "2 Title2..............................10",
    ],
  },
  {
    id: 1,
    input: {
      lengthOfLine: 30,
      N: 3,
      entries: ["One 5", "Two 50", "AppendixA 100"],
    },
    output: [
      "1 One........................5",
      "2 Two.......................50",
      "3 AppendixA................100",
    ],
  },
  {
    id: 2,
    input: {
      lengthOfLine: 45,
      N: 18,
      entries: [
        "A 1",
        ">AA 5",
        ">>AAA 8",
        ">>>AAAA 8",
        ">>>>AAAAA 9",
        ">>AAB 10",
        ">>>AABA 12",
        ">>>>AABAA 12",
        ">>>>AABAB 13",
        ">>>>>AABABA 14",
        ">AB 15",
        ">>ABA 20",
        ">>ABB 25",
        ">>>ABBA 26",
        ">>>>ABBAA 27",
        ">>>>>ABBAAA 28",
        ">AC 29",
        "B 5005",
      ],
    },
    output: [
      "1 A.........................................1",
      "    1 AA....................................5",
      "        1 AAA...............................8",
      "            1 AAAA..........................8",
      "                1 AAAAA.....................9",
      "        2 AAB..............................10",
      "            1 AABA.........................12",
      "                1 AABAA....................12",
      "                2 AABAB....................13",
      "                    1 AABABA...............14",
      "    2 AB...................................15",
      "        1 ABA..............................20",
      "        2 ABB..............................25",
      "            1 ABBA.........................26",
      "                1 ABBAA....................27",
      "                    1 ABBAAA...............28",
      "    3 AC...................................29",
      "2 B......................................5005",
    ],
  },
  {
    id: 3,
    input: {
      lengthOfLine: 50,
      N: 13,
      entries: [
        "Sudamerica 1",
        ">Argentina 5",
        ">>BuenosAires 8",
        ">>Cordoba 10",
        ">Brasil 15",
        ">>SaoPaulo 20",
        ">>Fortaleza 25",
        "Asia 30",
        ">Japan 32",
        ">>Yokohama 35",
        ">>Tokio 40",
        ">Iran 42",
        ">>Teheran 45",
      ],
    },
    output: [
      "1 Sudamerica.....................................1",
      "    1 Argentina..................................5",
      "        1 BuenosAires............................8",
      "        2 Cordoba...............................10",
      "    2 Brasil....................................15",
      "        1 SaoPaulo..............................20",
      "        2 Fortaleza.............................25",
      "2 Asia..........................................30",
      "    1 Japan.....................................32",
      "        1 Yokohama..............................35",
      "        2 Tokio.................................40",
      "    2 Iran......................................42",
      "        1 Teheran...............................45",
    ],
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      lengthOfLine: 29,
      N: 5,
      entries: [
        "Title1 4",
        ">Subtitle1 5",
        ">>Subsubtitle1 5",
        ">Subtitle2 6",
        "Title2 10",
      ],
    },
    error: ErrorEnum.OUT_OF_RANGE_LENGTH_OF_LINE,
  },
  {
    id: 1,
    input: {
      lengthOfLine: 40,
      N: 31,
      entries: [
        "Title1 4",
        ">Subtitle1 5",
        ">>Subsubtitle1 5",
        ">Subtitle2 6",
        "Title2 10",
      ],
    },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
  {
    id: 2,
    input: {
      lengthOfLine: 40,
      N: 5,
      entries: ["Title1 4", ">Subtitle1 5", ">>Subsubtitle1 5", ">Subtitle2 6"],
    },
    error: ErrorEnum.INVALID_ENTRIES,
  },
];

describe("test challenge 029", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { lengthOfLine, N, entries } = input;

    expect(solution(lengthOfLine, N, entries)).toEqual(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { lengthOfLine, N, entries } = input;

    expect(() => solution(lengthOfLine, N, entries)).toThrow(error);
  });
});
