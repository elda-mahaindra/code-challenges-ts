/*
    Binary Image

    You are going to write a simple program to decode some arrays of data into a black-and-write graphic.

    The graphic is composed of n lines of black and white pixels. We use . to represent a white pixel; O to represent a black pixel.

    For example, here is one line of graphic
    ....OOO.

    We shall encode it into an array 4 3 1
    because it starts with 4 whites, then 3 blacks, then 1 white.
    We assume most lines shall start with white.

    When there is a line starting with black, we add 0 at the beginning of the encoded data, to say there is no white pixel before the first black pixel.
    For example
    OO.OOOOO
    will be encoded into 0 2 1 5.

    You must output an array with one element of string "INVALID" if the graphic is not rectangular (this doesn't mean the input lines should be the same length, but the outputs lines should be).

    In this puzzle, you will be given n lines of encoded data.
    You are going to decode it into a graphic.

    Input
        • h: an integer h represents the number rows input.
        • rows: an array of strings where each string represents the encoded line of the graphic.

    Output
    an array with one element of string "INVALID" if the grid is not a rectangle, or an array of h rows where each row consists of pixels which has been represented by "." or "O".

    Constraints:
    • h < 200

    Example 1:
        Input: 
            h = 4, 
            rows = [
              "1 3 2 1",
              "1 3 2 1",
              "1 3 2 1",
              "1 3 2 1",
            ],
        Output: [
          ".OOO..O",
          ".OOO..O",
          ".OOO..O",
          ".OOO..O",
        ]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_ROWS = "The length of input 'rows' should equal to the input 'h'.",
  OUT_OF_RANGE_H = "The length of input 'h' should be less than 200.",
}

const isValid = (h: number, rows: string[]) => {
  switch (true) {
    case h >= 200: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_H);
    }
    case rows.length !== h: {
      throw new Error(ErrorEnum.INVALID_ROWS);
    }
    default: {
      return true;
    }
  }
};

export const solution = (h: number, rows: string[]) => {
  isValid(h, rows);

  const mapped = rows.map((row) =>
    row
      .split(" ")
      .map((num, i) =>
        Array(parseInt(num))
          .fill(i % 2 ? "O" : ".")
          .join("")
      )
      .join("")
  );

  const valid = mapped.reduce(
    (valid, row) => valid && row.length === mapped[0].length,
    true
  );

  return valid ? mapped : ["INVALID"];
};
