import type * as Challenge005 from "../challenges/challenge_005";

const { ErrorEnum, solution } = jest.requireActual<typeof Challenge005>(
  "../challenges/challenge_005.ts"
);

const successCases = [
  {
    input: { T: "E" },
    output: ["### ", "#   ", "##  ", "#   ", "### "],
  },
  {
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
    input: {
      T: "vFSnqyFMDeLxOGvcuKaFAVwNIEAABjtaAoZeOscdZqIIDluAAqSpoZrOsxZmHiJotsthzgzcQeKxmtTdjPkRGfXPTYwerPVhBWHkbJPIZBWtEviVrrpDtYhxSdmaOCsHPDDucToiANkONOdnIKDclAaOAlOEJXvwSzXchbbgVXiIgKomizGnLEPWEJyhAKKbkhgHawps",
    },
    error: ErrorEnum.OUT_OF_RANGE_N,
  },
];

describe("test challenge 005", () => {
  it.each(successCases)(
    "returns '$output' when T = '$input.T'",
    ({ input, output }) => {
      expect(solution(input.T)).toEqual(output);
    }
  );

  it.each(failureCases)(
    "throws an error '$error' when T = '$input.T'",
    ({ input, error }) => {
      expect(() => solution(input.T)).toThrow(error);
    }
  );
});
