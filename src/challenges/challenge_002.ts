/*
    Valid Sudoku

    Determine if a 9 x 9 Sudoku board is valid according to the following rules:
      • Each row must contain the digits 1-9 without repetition.
      • Each column must contain the digits 1-9 without repetition.
      • Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

    Example 1:
      Input: board = [
            [7, 9, 2, 1, 5, 4, 3, 8, 6], 
            [6, 4, 3, 8, 2, 7, 1, 5, 9],
            [8, 5, 1, 3, 9, 6, 7, 2, 4],
            [2, 6, 5, 9, 7, 3, 8, 4, 1],
            [4, 8, 9, 5, 6, 1, 2, 7, 3],
            [3, 1, 7, 4, 8, 2, 9, 6, 5],
            [1, 3, 6, 7, 4, 8, 5, 9, 2],
            [9, 7, 4, 2, 1, 5, 6, 3, 8],
            [5, 2, 8, 6, 3, 9, 4, 1, 7]
      ]
      Output: 'valid'
    
    Example 2:
      Input: board = [
            [5, 5, 5, 5, 5, 5, 5, 5, 5], 
            [5, 5, 5, 5, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5, 5, 5, 5]
      ]
      Output: 'not valid'
    
    source: codr
*/

export enum ErrorEnum {
  INVALID_BOARD_DIMENSION = "The input 'board' should be a 9 x 9 sudoku board.",
  OUT_OF_RANGE_BOARD_VALUE = "The input 'board' should contain only numbers between 1 to 9.",
}

const isValid = (board: number[][]) => {
  const checkValidDimension = (
    board: number[][],
    expectedXLength: number,
    expectedYLength: number
  ) => {
    const validXLength = board.reduce(
      (match, row) => match && row.length === expectedXLength,
      true
    );
    const validYLength = board.length === expectedYLength;

    return validXLength && validYLength;
  };

  const checkValidRange = (board: number[][], start: number, end: number) => {
    if (end <= start) return false;

    const valid = board.reduce((valid, row) => {
      const validRow = row.reduce(
        (valid, n) => valid && n >= start && n <= end,
        true
      );

      return valid && validRow;
    }, true);

    return valid;
  };

  switch (true) {
    case !checkValidDimension(board, 9, 9): {
      throw new Error(ErrorEnum.INVALID_BOARD_DIMENSION);
    }
    case !checkValidRange(board, 1, 9): {
      throw new Error(ErrorEnum.OUT_OF_RANGE_BOARD_VALUE);
    }
    default: {
      return true;
    }
  }
};

const checkDuplication = (numbers: number[]) => {
  const sorted = [...numbers].sort((a, b) => (a > b ? 1 : -1));

  const duplication = sorted.reduce((duplication, n, i) => {
    if (!i) return duplication;

    return duplication || n === sorted[i - 1];
  }, false);

  return duplication;
};

const transpose = (matrix: number[][]) => {
  return matrix[0].map((row, i) => matrix.map((row) => row[i]));
};

/**
 * transform 9x9 board to 3x3 board represented by each row of the transformation result
 * @param {number[][]} board - 9x9 board
 * @returns
 */
const transform = (board: number[][]) => {
  const transformed = board.map((row) => row.map(() => 0));

  for (let i = 0; i < 3; i++) {
    const sliced = [...board].slice(3 * i, 3 + 3 * i);
    const transposed = transpose(sliced);

    for (let j = 0; j < 3; j++) {
      const sliced = [...transposed].slice(3 * j, 3 + 3 * j);
      const reduced = sliced.reduce(
        (reduced, numbers) => [...reduced, ...numbers],
        [] as number[]
      );
      const sorted = [...reduced].sort((a, b) => (a > b ? 1 : -1));

      transformed[i * 3 + j] = sorted;
    }
  }

  return transformed;
};

export const solution = (board: number[][]) => {
  isValid(board);

  const duplicationInRow = board.reduce(
    (duplicationInRow, row) => duplicationInRow || checkDuplication(row),
    false
  );
  const duplicationInColumn = transpose(board).reduce(
    (duplicationInColumn, column) =>
      duplicationInColumn || checkDuplication(column),
    false
  );
  const duplicationInSmallBoard = transform(board).reduce(
    (duplicationInSmallBoard, smallBoard) =>
      duplicationInSmallBoard || checkDuplication(smallBoard),
    false
  );

  return duplicationInRow || duplicationInColumn || duplicationInSmallBoard
    ? "not valid"
    : "valid";
};
