import type * as Challenge005 from "../challenges/challenge_005";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge005>(
  "../challenges/challenge_005.ts"
);

const successCases = [
  {
    id: 0,
    input: { T: "E" },
    output: ["### ", "#   ", "##  ", "#   ", "### "],
  },
  {
    id: 1,
    input: { T: "MANHATTAN" },
    output: [
      "# #  #  ### # #  #  ### ###  #  ### ",
      "### # # # # # # # #  #   #  # # # # ",
      "### ### # # ### ###  #   #  ### # # ",
      "# # # # # # # # # #  #   #  # # # # ",
      "# # # # # # # # # #  #   #  # # # # ",
    ],
  },
  {
    id: 2,
    input: { T: "ManhAtTan" },
    output: [
      "# #  #  ### # #  #  ### ###  #  ### ",
      "### # # # # # # # #  #   #  # # # # ",
      "### ### # # ### ###  #   #  ### # # ",
      "# # # # # # # # # #  #   #  # # # # ",
      "# # # # # # # # # #  #   #  # # # # ",
    ],
  },
  {
    id: 3,
    input: { T: "M@NH@TT@N" },
    output: [
      "# # ### ### # # ### ### ### ### ### ",
      "###   # # # # #   #  #   #    # # # ",
      "###  ## # # ###  ##  #   #   ## # # ",
      "# #     # # # #      #   #      # # ",
      "# #  #  # # # #  #   #   #   #  # # ",
    ],
  },
];

const failureCases = [
  {
    id: 0,
    input: {
      T: "vFSnqyFMDeLxOGvcuKaFAVwNIEAABjtaAoZeOscdZqIIDluAAqSpoZrOsxZmHiJotsthzgzcQeKxmtTdjPkRGfXPTYwerPVhBWHkbJPIZBWtEviVrrpDtYhxSdmaOCsHPDDucToiANkONOdnIKDclAaOAlOEJXvwSzXchbbgVXiIgKomizGnLEPWEJyhAKKbkhgHawps",
    },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
];

describe("test challenge 005", () => {
  it.each(successCases)("success case $id", ({ input, output }) => {
    expect(solution(input.T)).toEqual(output);
  });

  it.each(failureCases)("failure case $id", ({ input, error }) => {
    expect(() => solution(input.T)).toThrow(error);
  });
});
