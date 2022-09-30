/*
    Reverse Minesweeper

    Given a grid of mine locations (where . are empty cells and x are mines), your goal is to display the grid like it appears if you win the game.
    Each position is a digit indicating the number of mines bordering it (including diagonals). 
    The mines (x) don't appear anymore. Mines and positions that do not border any mines both appear as empty cells (.).

    Input
        • w: represents the width of the grid.
        • h: represents the height of the grid.
        • lines: an array of strings which each string represents the line of the minefield, with dots (.) or mines (x).

    Output
    An h x w array of strings which represents the line of the minefield, with dots (.) or mines (x).

    Constraints:
        • 1 ≤ w ≤ 30
        • 1 ≤ h ≤ 30

    Example 1:
        Input: w = 16, h =9, 
            lines = [
                "................",
                "................",
                "................",
                "................",
                "................",
                "....x...........",
                "................",
                "................",
                "................",
            ]
        Output: [
            "................",
            "................",
            "................",
            "................",
            "...111..........",
            "...1x1..........",
            "...111..........",
            "................",
            "................",
        ]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_LINE = "The length of each string in input 'lines' should equal to 'w'.",
  INVALID_LINES = "The length of input 'lines' should equal to 'h'.",
  OUT_OF_RANGE_H = "The value of input 'h' should be between 1 and 30.",
  OUT_OF_RANGE_W = "The value of input 'w' should be between 1 and 30.",
}

const isValid = (w: number, h: number, lines: string[]) => {
  switch (true) {
    case w < 1 || w > 30: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_W);
    }
    case h < 1 || h > 30: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_H);
    }
    case lines.length !== h: {
      throw new Error(ErrorEnum.INVALID_LINES);
    }
    // ensure each strings inside lines has the length of w and consist of dots (.) or mines (x)
    case !lines.reduce((valid, line) => {
      const splitted = line.split("");

      const validContent = splitted.reduce(
        (validContent, content) =>
          validContent && (content === "." || content === "x"),
        true
      );

      return valid && line.length === w && validContent;
    }, true): {
      throw new Error(ErrorEnum.INVALID_LINE);
    }
    default: {
      return true;
    }
  }
};

export const solution = (w: number, h: number, lines: string[]) => {
  isValid(w, h, lines);

  let minePoints: { x: number; y: number }[] = [];

  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      if (lines[j][i] === "x") minePoints = [...minePoints, { x: i, y: j }];
    }
  }

  let resultLines: string[] = [];

  for (let j = 0; j < h; j++) {
    let resultContents = lines[j].split("");

    for (let i = 0; i < w; i++) {
      if (resultContents[i] === "x") resultContents[i] = ".";
      else {
        const filtered = minePoints.filter((point) => {
          const { x, y } = point;

          return (
            (i === x - 1 || i === x + 1 || i === x) &&
            (j === y - 1 || j === y + 1 || j === y)
          );
        });

        resultContents[i] = filtered.length ? filtered.length.toString() : ".";
      }
    }

    const resultLine = resultContents.join("");

    resultLines = [...resultLines, resultLine];
  }

  return resultLines;
};
