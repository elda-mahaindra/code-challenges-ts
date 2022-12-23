/*
    Offset Arrays

    To settle the debate of 0-based vs 1-based indexing I have created a language where you must explicitly state the range of indices an array should have.

    For example, given an array definition "A[-1..1] = 1 2 3", you would have:
    A[-1] = 1
    A[0] = 2
    A[1] = 3

    You are given a list of n array definitions and your job is to figure out what number is found in a given index i of an array arr. 
    Note that the indexing operations may be nested (in the above example, A[A[-1]] would produce result 3).

    Input
        • n: an integer represents the number of array assignments.
        • assignments: an array of n strings where each string represents an assigment 
          in the form of array_identifier[first_index..last_index] = last_index - first_index + 1.
        • element: a string that represents the element to print in the form of arr[i].

    Output
    a single integer.

    Constraints:
    • 1 ≤ n ≤ 100
    • Each array name consists of only uppercase letters (A to Z)
    • Array lengths are between 1 and 100 (no empty arrays)
    • Indexing operations have at most 50 levels of nesting
    • Indices are always within bounds in the test cases

    Example 1:
        Input: 
          n = 3,
          assignments = [
            "A[-1..1] = 1 2 3",
            "B[3..7] = 3 4 5 6 7",
            "C[-2..1] = 1 2 3 4",
          ],
          element = "A[0]"
        Output: 2

    source: codingame
*/

export enum ErrorEnum {
  INVALID_ARRAY_ASSIGNMENTS = "The length of input 'assignments' should be equal to input 'n' and each assignment should be a valid assignment according to the constraints",
  INVALID_ELEMENT = "The input 'element' should be a valid indexing operation and have at most 50 levels of nesting.",
  OUT_OF_RANGE_N = "The value of input 'n' should be between 1 and 100.",
}

interface IArrayAssignment {
  identifier: string;
  firstIndex: number;
  lastIndex: number;
  values: number[];
}

const isValid = (n: number, assignments: string[], element: string) => {
  const validElement = (element: string) => {
    let openSquareBracketCount = 0;
    let closeSquareBracketCount = 0;

    for (let i = 0; i < element.length; i++) {
      if (element[i] === "[") {
        if (!/^[A-Z-\d]$/.test(element[i + 1])) return false;

        openSquareBracketCount += 1;
      }

      if (element[i] === "]") {
        if (!/^[\]\d]$/.test(element[i - 1])) return false;

        closeSquareBracketCount += 1;
      }
    }

    return (
      openSquareBracketCount === closeSquareBracketCount &&
      openSquareBracketCount >= 1 &&
      openSquareBracketCount <= 50
    );
  };

  switch (true) {
    case n < 1 || n > 100: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case assignments.length !== n ||
      !assignments.reduce((valid, assignment) => {
        const openSquareBracketIndex = assignment.indexOf("[");
        const closeSquareBracketIndex = assignment.indexOf("]");
        const connectorIndex = assignment.indexOf("..");

        const firstIndex = parseInt(
          assignment.slice(openSquareBracketIndex + 1, connectorIndex)
        );
        const lastIndex = parseInt(
          assignment.slice(connectorIndex + 2, closeSquareBracketIndex)
        );

        const arrayLength = lastIndex - firstIndex + 1;

        const validIdentifier = /^[A-Z]+$/.test(
          assignment.slice(0, openSquareBracketIndex)
        );

        const validLength = arrayLength >= 1 && arrayLength <= 100;

        return valid && validIdentifier && validLength;
      }, true): {
      throw new Error(ErrorEnum.INVALID_ARRAY_ASSIGNMENTS);
    }
    case !validElement(element): {
      throw new Error(ErrorEnum.INVALID_ELEMENT);
    }
    default: {
      return true;
    }
  }
};

const getValue = (arrayAssingment: IArrayAssignment, index: number) =>
  arrayAssingment.values[index - arrayAssingment.firstIndex];

export const solution = (n: number, assignments: string[], element: string) => {
  isValid(n, assignments, element);

  const arrayAssignments = assignments.map((assignment): IArrayAssignment => {
    const [leftSide, rightSide] = assignment.split(" = ");

    const values = rightSide
      .split(" ")
      .map((numberString) => parseInt(numberString));

    const openSquareBracketIndex = leftSide.indexOf("[");
    const closeSquareBracketIndex = leftSide.indexOf("]");
    const connectorIndex = leftSide.indexOf("..");

    const identifier = leftSide.slice(0, openSquareBracketIndex);
    const firstIndex = parseInt(
      leftSide.slice(openSquareBracketIndex + 1, connectorIndex)
    );
    const lastIndex = parseInt(
      leftSide.slice(connectorIndex + 2, closeSquareBracketIndex)
    );

    return { identifier, firstIndex, lastIndex, values };
  });

  let stringValue = element;
  while (stringValue.includes("[")) {
    const identifierIndex = stringValue.match(/[A-Z]+\[[-]?[\d]+\]/)!.index!;
    const openSquareBracketIndex = stringValue.match(/\[[-]?[\d]+\]/)!.index!;
    const closeSquareBracketIndex = stringValue.indexOf("]");

    const identifier = stringValue.slice(
      identifierIndex,
      openSquareBracketIndex
    );
    const index = stringValue.slice(
      openSquareBracketIndex + 1,
      closeSquareBracketIndex
    );

    const arrayAssignment = arrayAssignments.find(
      (arrayAssignment) => arrayAssignment.identifier === identifier
    )!;

    const currentValue = getValue(arrayAssignment, parseInt(index));

    stringValue = stringValue.replace(
      `${identifier}[${index.toString()}]`,
      currentValue.toString()
    );
  }

  return parseInt(stringValue);
};
