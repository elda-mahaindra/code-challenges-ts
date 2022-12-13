/*
    Insert to String

    You're given a string and a list of changes to do on that string.
    Each change includes a line number, a column number, and a string to add at that location.
    Commit all of the changes to the given string so they wouldn't interfere with each other.

    ("\n" should be replaced with a newline.)

    Input
        • s: a string to manipulate.
        • changeCount: an integer that represents the number of changes.
        • rawChanges: an array of strings where each string represents the change.

    Output
    an array of strings where each string represents the manipulated string in one row.

    Constraints:
    • the length of s ≥ 1
    • 1 ≤ changeCount ≤ 10
    • each string inside 'rawChanges' should be in the format of <Line number>|<Column number>|<String to be added>

    Example 1:
        Input: 
          s = "Hello world",
          changeCount = 4,
          rawChanges = ["0|11|!", "0|5|,\\n", "0|7| w", "0|10|\\n"],
        Output: ["Hello,", " w worl", "d!"]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_RAW_CHANGE = "The length of input 'rawChanges' should equal to the input 'changeCount' and each change should be a valid change.",
  OUT_OF_RANGE_CHANGE_COUNT = "The value of input 'changeCount' should be between 1 and 10.",
  OUT_OF_RANGE_S = "The value of input 's' should be more than 0.",
}

interface IChange {
  lineNumber: number;
  columnNumber: number;
  pasted: string;
}

const isValid = (s: string, changeCount: number, rawChanges: string[]) => {
  switch (true) {
    case s.length < 1: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_S);
    }
    case changeCount < 1 || changeCount > 10: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_CHANGE_COUNT);
    }
    case rawChanges.length !== changeCount ||
      !rawChanges.reduce((valid, rawChange) => {
        const splitted = rawChange.split("|");

        if (splitted.length != 3) return false;

        return (
          valid &&
          !isNaN(parseInt(splitted[0])) &&
          !isNaN(parseInt(splitted[1]))
        );
      }, true): {
      throw new Error(ErrorEnum.INVALID_RAW_CHANGE);
    }
    default: {
      return true;
    }
  }
};

export const solution = (
  s: string,
  changeCount: number,
  rawChanges: string[]
) => {
  isValid(s, changeCount, rawChanges);

  const targets = s.split("\\n");

  const changes: IChange[] = rawChanges.map((rawChange) => {
    const splitted = rawChange.split("|");

    return {
      lineNumber: parseInt(splitted[0]),
      columnNumber: parseInt(splitted[1]),
      pasted: splitted[2],
    };
  });

  const sortedChanges = [...changes].sort((a, b) =>
    a.lineNumber === b.lineNumber
      ? a.columnNumber < b.columnNumber
        ? 1
        : -1
      : a.lineNumber < b.lineNumber
      ? 1
      : -1
  );

  sortedChanges.forEach((change) => {
    const { lineNumber, columnNumber, pasted } = change;

    const target = targets[lineNumber];
    const splitted = target.split("");
    splitted.splice(columnNumber, 0, pasted);

    targets[lineNumber] = splitted.join("");
  });

  const reduced = targets.reduce((reduced, target) => {
    const splitted = target.split("\\n");

    return [...reduced, ...splitted];
  }, [] as string[]);

  return reduced;
};
