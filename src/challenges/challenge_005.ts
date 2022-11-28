/*
    ASCII Art

    ASCII art allows you to represent forms by using characters. To be precise, in our case, these forms are words. 
    For example, the word "MANHATTAN" could be displayed as follows in ASCII art:
 
                # #  #  ### # #  #  ### ###  #  ###
                ### # # # # # # # #  #   #  # # # #
                ### ### # # ### ###  #   #  ### # #
                # # # # # # # # # #  #   #  # # # #
                # # # # # # # # # #  #   #  # # # #
    
     Your mission is to write a program that can display a line of text in ASCII art in a style you are given as input.

    Input
        • T: The line of text to be displayed, composed of N ASCII characters.
    
    Constant
        • L: the width of a letter represented in ASCII art. All letters are the same width.
            const L = 4
        • H: the height of a letter represented in ASCII art. All letters are the same height.
            const H = 5
        • rows: array of string of characters ABCDEFGHIJKLMNOPQRSTUVWXYZ? Represented in ASCII art.
            const rows = [
                    " #  ##   ## ##  ### ###  ## # # ###  ## # # #   # # ###  #  ##   #  ##   ## ### # # # # # # # # # # ### ### ",
                    "# # # # #   # # #   #   #   # #  #    # # # #   ### # # # # # # # # # # #    #  # # # # # # # # # #   #   # ",
                    "### ##  #   # # ##  ##  # # ###  #    # ##  #   ### # # # # ##  # # ##   #   #  # # # # ###  #   #   #   ## ",
                    "# # # # #   # # #   #   # # # #  #  # # # # #   # # # # # # #    ## # #   #  #  # # # # ### # #  #  #       ",
                    "# # ##   ## ##  ### #    ## # # ###  #  # # ### # # # #  #  #     # # # ##   #  ###  #  # # # #  #  ###  #  "
                ]

    Output
    The text T in ASCII art represented by an array of string.
    The characters a to z are shown in ASCII art by their equivalent in upper case.
    The characters that are not in the intervals [a-z] or [A-Z] will be shown as a question mark in ASCII art.

    Constraints:
        • 0 < N < 200

    Example 1:
        Input: 
            L = 4, H = 5, T = E
        Output: [
            "### ",
            "#   ",
            "##  ",
            "#   ",
            "### ",
        ]
    
    Example 2:
        Input: 
            L = 4, H = 5, T = MANHATTAN
        Output: [
            "# #  #  ### # #  #  ### ###  #  ### ",
            "### # # # # # # # #  #   #  # # # # ",
            "### ### # # ### ###  #   #  ### # # ",
            "# # # # # # # # # #  #   #  # # # # ",
            "# # # # # # # # # #  #   #  # # # # ",
        ]

    source: codingame
*/

const L = 4;
const H = 5;
const rows = [
  " #  ##   ## ##  ### ###  ## # # ###  ## # # #   # # ###  #  ##   #  ##   ## ### # # # # # # # # # # ### ### ",
  "# # # # #   # # #   #   #   # #  #    # # # #   ### # # # # # # # # # # #    #  # # # # # # # # # #   #   # ",
  "### ##  #   # # ##  ##  # # ###  #    # ##  #   ### # # # # ##  # # ##   #   #  # # # # ###  #   #   #   ## ",
  "# # # # #   # # #   #   # # # #  #  # # # # #   # # # # # # #    ## # #   #  #  # # # # ### # #  #  #       ",
  "# # ##   ## ##  ### #    ## # # ###  #  # # ### # # # #  #  #     # # # ##   #  ###  #  # # # #  #  ###  #  ",
];

export enum ErrorEnum {
  OUT_OF_RANGE_N = "The length of input 'T' should be between 1 and 199.",
}

const charsAvailable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ?";
const totalCharsAvailable = charsAvailable.length;

const reducedRows = rows.reduce((reducedRows, row) => {
  let reducedRow: string[] = [];

  for (let i = 0; i < totalCharsAvailable; i++) {
    const sliced = row.slice(i * L, i * L + L);

    reducedRow = [...reducedRow, sliced];
  }

  return [...reducedRows, reducedRow];
}, [] as string[][]);

const isValid = (T: string) => {
  switch (true) {
    case T.length <= 0 || T.length >= 200: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    default: {
      return true;
    }
  }
};

export const solution = (T: string) => {
  isValid(T);

  const inputs = T.toUpperCase()
    .split("")
    .map((input) => (/[a-zA-Z]/.test(input) ? input : "?"));

  const tIndexes = inputs.reduce(
    (tIndexes, tChar) => [
      ...tIndexes,
      [...charsAvailable].findIndex((c) => c === tChar)!,
    ],
    [] as number[]
  );

  let result: string[] = [];
  for (let i = 0; i < H; i++) {
    const tHArt = tIndexes.reduce(
      (tHArt, tIndex) => tHArt.concat(reducedRows[i][tIndex]),
      ""
    );

    result = [...result, tHArt];
  }

  return result;
};
