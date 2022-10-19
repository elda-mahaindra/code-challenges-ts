import type * as Challenge016 from "../challenges/challenge_016";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge016>(
  "../challenges/challenge_016.ts"
);

const successCases = [
  {
    id: 0,
    input: {
      n: 2,
      m: 3,
      inputSignals: [
        "A __---___---___---___---___",
        "B ____---___---___---___---_",
      ],
      operations: ["C AND A B", "D OR A B", "E XOR A B"],
    },
    output: [
      "C ____-_____-_____-_____-___",
      "D __-----_-----_-----_-----_",
      "E __--_--_--_--_--_--_--_--_",
    ],
  },
  {
    id: 1,
    input: {
      n: 1,
      m: 1,
      inputSignals: ["A __---___---___---___---___"],
      operations: ["B NAND A A"],
    },
    output: ["B --___---___---___---___---"],
  },
  {
    id: 2,
    input: {
      n: 3,
      m: 3,
      inputSignals: [
        "CLK _-_-_-_-_-_-_-_-_-_-_-_-_-",
        "IN1 ___---___---___---___---__",
        "IN2 --__--__--__--__--__--__--",
      ],
      operations: ["OUT1 AND CLK IN1", "OUT2 AND CLK IN2", "OUT3 AND IN1 IN2"],
    },
    output: [
      "OUT1 ___-_-___-_-___-_-___-_-__",
      "OUT2 _-___-___-___-___-___-___-",
      "OUT3 ____--___-______--___-____",
    ],
  },
  {
    id: 3,
    input: {
      n: 3,
      m: 3,
      inputSignals: [
        "CLK _-_-_-_-_-_-_-_-_-_-_-_-_-",
        "IN1 ----____----____----____--",
        "IN2 --__--__--__--__--__--__--",
      ],
      operations: ["OUT1 OR CLK IN1", "OUT2 OR CLK IN2", "OUT3 OR IN1 IN2"],
    },
    output: [
      "OUT1 ----_-_-----_-_-----_-_---",
      "OUT2 --_---_---_---_---_---_---",
      "OUT3 ------__------__------__--",
    ],
  },
  {
    id: 4,
    input: {
      n: 3,
      m: 3,
      inputSignals: [
        "CLK _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_",
        "IN1 __--__--__--__--__--__--__--__--_",
        "IN2 ___---___---___---___---___---___",
      ],
      operations: ["OUT1 XOR IN1 CLK", "OUT2 XOR IN2 CLK", "OUT3 XOR IN2 IN1"],
    },
    output: [
      "OUT1 _--__--__--__--__--__--__--__--__",
      "OUT2 _-__-__-__-__-__-__-__-__-__-__-_",
      "OUT3 __-_----_-____-_----_-____-_----_",
    ],
  },
  {
    id: 5,
    input: {
      n: 1,
      m: 1,
      inputSignals: ["IN0 -_--__---___----____-_--__---___"],
      operations: ["OUT OR IN0 IN0"],
    },
    output: ["OUT -_--__---___----____-_--__---___"],
  },
  {
    id: 6,
    input: {
      n: 3,
      m: 3,
      inputSignals: [
        "CLK _-_-_-_-_-_-_-_-_-_-_-_-_-",
        "IN1 ___---___---___---___---__",
        "IN2 --__--__--__--__--__--__--",
      ],
      operations: [
        "OUT1 NAND CLK IN1",
        "OUT2 NAND CLK IN2",
        "OUT3 NAND IN1 IN2",
      ],
    },
    output: [
      "OUT1 ---_-_---_-_---_-_---_-_--",
      "OUT2 -_---_---_---_---_---_---_",
      "OUT3 ----__---_------__---_----",
    ],
  },
  {
    id: 7,
    input: {
      n: 3,
      m: 2,
      inputSignals: [
        "IN1 --__--__--__--__--__--__--__--__--__",
        "IN2 ____----____----____----____----____",
        "IN3 --------________--------________----",
      ],
      operations: ["OUT1 NOR IN2 IN1", "OUT2 NOR IN2 IN3"],
    },
    output: [
      "OUT1 __--______--______--______--______--",
      "OUT2 ________----____________----________",
    ],
  },
  {
    id: 8,
    input: {
      n: 4,
      m: 3,
      inputSignals: [
        "A -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_",
        "B --__--__--__--____----____----______------",
        "C -_-__--__--__---___---___---___----____---",
        "D -----_____-----_____-----_____-----_____--",
      ],
      operations: ["X XNOR A B", "Y XNOR B C", "Z XNOR C D"],
    },
    output: [
      "X -__--__--__--__-_--_-__-_--_-__-_-_--_-_-_",
      "Y -__-_-_-_-_-_-__--_------_--__-____-___---",
      "Z -_-____--_-__--_---_--______--_--------_--",
    ],
  },
  {
    id: 9,
    input: {
      n: 4,
      m: 16,
      inputSignals: [
        "ZORGLUB ----____----____----____----____----____--",
        "MEGAMAN --____----____----____----____----____----",
        "ZOLTRON ---___---___------______------______-_-_-_",
        "PEW_PEW -_-_-_-_------_____----____---___--__--__-",
      ],
      operations: [
        "OUTPUT1 AND ZORGLUB MEGAMAN",
        "OUTPUT2 OR ZORGLUB ZOLTRON",
        "OUTPUT3 XOR ZORGLUB PEW_PEW",
        "OUTPUT4 AND ZORGLUB ZORGLUB",
        "ROGUE_1 OR MEGAMAN MEGAMAN",
        "ROGUE_2 NAND MEGAMAN MEGAMAN",
        "ROGUE_3 NOR PEW_PEW PEW_PEW",
        "ROGUE_4 XNOR PEW_PEW MEGAMAN",
        "SQUAD_1 NAND PEW_PEW MEGAMAN",
        "SQUAD_2 OR ZOLTRON PEW_PEW",
        "SQUAD_3 NOR ZOLTRON PEW_PEW",
        "SQUAD_4 AND ZOLTRON PEW_PEW",
        "MIKADO1 AND MEGAMAN PEW_PEW",
        "MIKADO2 OR MEGAMAN PEW_PEW",
        "MIKADO3 XOR MEGAMAN MEGAMAN",
        "MIKADO4 XNOR ZOLTRON ZOLTRON",
      ],
    },
    output: [
      "OUTPUT1 --______--______--______--______--______--",
      "OUTPUT2 ----__--------------____------__-----_-_--",
      "OUTPUT3 _-_--_-_____--__---_---_---_--__-__-_--_-_",
      "OUTPUT4 ----____----____----____----____----____--",
      "ROGUE_1 --____----____----____----____----____----",
      "ROGUE_2 __----____----____----____----____----____",
      "ROGUE_3 _-_-_-_-______-----____----___---__--__--_",
      "ROGUE_4 -__-_--_--________-___-___-______-_--_-__-",
      "SQUAD_1 _-----_-__------------_----------_----_--_",
      "SQUAD_2 ---_-_------------_----_------___--_---_--",
      "SQUAD_3 ___-_-____________-____-______---__-___-__",
      "SQUAD_4 -_-___-_-___--_____________---________-___",
      "MIKADO1 -_____-_--____________-__________-____-__-",
      "MIKADO2 ---_-_------------_-------_--------__-----",
      "MIKADO3 __________________________________________",
      "MIKADO4 ------------------------------------------",
    ],
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      n: 5,
      m: 3,
      inputSignals: [
        "A __---___---___---___---___",
        "B ____---___---___---___---_",
      ],
      operations: ["C AND A B", "D OR A B", "E XOR A B"],
    },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
  {
    id: 1,
    input: {
      n: 2,
      m: 17,
      inputSignals: [
        "A __---___---___---___---___",
        "B ____---___---___---___---_",
      ],
      operations: ["C AND A B", "D OR A B", "E XOR A B"],
    },
    error: ErrorEnum.OUT_OF_RANGE_M,
  },
  {
    id: 2,
    input: {
      n: 2,
      m: 3,
      inputSignals: [
        "A __---___---___---___---___",
        "B ____---___---___---___---_",
        "Z ____---___---___---___---_",
      ],
      operations: ["C AND A B", "D OR A B", "E XOR A B"],
    },
    error: ErrorEnum.INVALID_INPUT_SIGNALS,
  },
  {
    id: 3,
    input: {
      n: 2,
      m: 3,
      inputSignals: [
        "A ..---...---...---...---...",
        "B ____---___---___---___---_",
      ],
      operations: ["C AND A B", "D OR A B", "E XOR A B"],
    },
    error: ErrorEnum.INVALID_INPUT_SIGNALS,
  },
  {
    id: 4,
    input: {
      n: 2,
      m: 3,
      inputSignals: [
        "A __---___---___---___---___",
        "B ____---___---___---___---_",
      ],
      operations: ["C NANO A B", "D OR A B", "E XOR A B"],
    },
    error: ErrorEnum.INVALID_OPERATIONS,
  },
  {
    id: 5,
    input: {
      n: 2,
      m: 3,
      inputSignals: [
        "A __---___---___---___---___",
        "B ____---___---___---___---_",
      ],
      operations: ["C AND A Z", "D OR A B", "E XOR A B"],
    },
    error: ErrorEnum.INVALID_OPERATIONS,
  },
];

describe("test challenge 016", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    const { n, m, inputSignals, operations } = input;

    expect(solution(n, m, inputSignals, operations)).toEqual(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    const { n, m, inputSignals, operations } = input;

    expect(() => solution(n, m, inputSignals, operations)).toThrow(error);
  });
});
