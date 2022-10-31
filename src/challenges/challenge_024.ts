/*
    1D Spreadsheet

    You are given a 1-dimensional spreadsheet. You are to resolve the formulae and give the value of all its cells.

    Each input cell's content is provided as an operation with two operands arg1 and arg2.

    There are 4 types of operations:
    • VALUE arg1 arg2: The cell's value is arg1, (arg2 is not used and will be "_" to aid parsing).
    • ADD arg1 arg2: The cell's value is arg1 + arg2.
    • SUB arg1 arg2: The cell's value is arg1 - arg2.
    • MULT arg1 arg2: The cell's value is arg1 × arg2.

    Arguments can be of two types:
    • Reference $ref: 
        If an argument starts with a dollar sign, it is a interpreted as a reference and its value is equal to the value of the cell by that number ref, 0-indexed.
        For example, "$0" will have the value of the result of the first cell.
        Note that a cell can reference a cell after itself!
    • Value val: 
        If an argument is a pure number, its value is val.
        For example: "3" will have the value 3.

    There won't be any cyclic references: a cell that reference itself or a cell that references it, directly or indirectly.

    Input
        • N: an integer N represents the number of cells.
        • operations: an array of strings where each string represents the operation type, arg1, and arg2 separated by a space.

    Output
    An array of N numbers where each string represents the value of each cell.

    Constraints:
    • 1 ≤ N ≤ 100
    • -10000 ≤ val ≤ 10000
    • $0 ≤ $ref ≤ $(N - 1)
    • val ∈ Z
    • ref ∈ N
    • there are no cyclic references

    Example 1:
        Input: N = 2, operations = ["VALUE 3 _", "ADD $0 4"]
        Output: ["3", "7"]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_OPERATION = "The length of input 'operations' should equal to the input 'N'.",
  OUT_OF_RANGE_N = "The value of input 'N' should be between 1 and 100.",
}

type TOperation = "VALUE" | "ADD" | "SUB" | "MULT";

interface ICell {
  op: TOperation;
  arg1: string;
  arg2: string;
  counted: boolean;
  value: number;
}

const isValid = (N: number, operations: string[]) => {
  switch (true) {
    case N < 1 || N > 100: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case operations.length !== N: {
      throw new Error(ErrorEnum.INVALID_OPERATION);
    }
    default: {
      return true;
    }
  }
};

const count = (operationType: TOperation, arg1: number, arg2: number) => {
  switch (operationType) {
    case "VALUE": {
      return arg1;
    }
    case "ADD": {
      return arg1 + arg2;
    }
    case "SUB": {
      return arg1 - arg2;
    }
    // case "MULT"
    default: {
      return arg1 * arg2;
    }
  }
};

const checkCounted = (cells: ICell[]) =>
  cells.reduce((allCounted, cell) => allCounted && cell.counted, true);

export const solution = (N: number, operations: string[]) => {
  isValid(N, operations);

  let cells: ICell[] = operations.map((operation) => {
    const [op, arg1, arg2] = operation.split(" ");
    let counted = false;
    let value = 0;

    if (!arg1.includes("$") && !arg2.includes("$")) {
      const intParsedArg1 = parseInt(arg1);
      const intParsedArg2 = parseInt(arg2);

      value = count(op as TOperation, intParsedArg1, intParsedArg2);
      counted = true;
    }

    return {
      op: op as TOperation,
      arg1,
      arg2,
      counted,
      value,
    };
  });

  let allCounted = checkCounted(cells);

  while (!allCounted) {
    cells = cells.map((cell, i, cells) => {
      const { op, arg1, arg2, counted } = cell;

      if (!counted) {
        let intParsedArg1 = 0;
        let intParsedArg2 = 0;

        if (arg1.includes("$")) {
          const cellRef1 = cells[parseInt(arg1.substring(1))];

          if (!cellRef1.counted) return cell;

          intParsedArg1 = cellRef1.value;
        } else intParsedArg1 = parseInt(arg1);

        if (arg2.includes("$")) {
          const cellRef2 = cells[parseInt(arg2.substring(1))];

          if (!cellRef2.counted) return cell;

          intParsedArg2 = cellRef2.value;
        } else intParsedArg2 = parseInt(arg2);

        return {
          op: op as TOperation,
          arg1,
          arg2,
          counted: true,
          value: count(op, intParsedArg1, intParsedArg2),
        };
      }

      return cell;
    });

    allCounted = checkCounted(cells);
  }

  return cells.map((cell) => parseInt(cell.value.toString()));
};
