/*
    Happy Numbers

    A happy number is defined by the following process:
    Starting with any positive integer, replace the number by the sum of the squares of its digits in base-ten. 
    Repeat the process until the number either equals 1 (where it will stay), or it loops endlessly in a cycle that does not include 1. 
    Those numbers for which this process ends in 1 are happy numbers, while those that do not end in 1 are unhappy numbers.

    Given a list of numbers, classify each of them as happy or unhappy.

    Input
        • N: an integer that represents the number of numbers to test.
        • strNums: an array of string where each string represents the positive integer to test.

    Output
    An array of N strings where each string consists of two parts separated by a space which are the number which has been tested and an ascii art of :) or :( to indicates wheter the number is a happy or unhappy number.

    Constraints:
    • 1 ≤ N ≤ 100
    • 0 < strNums ≤ 10^26

    Example 1:
        Input: N = 2, strNums = ["23", "24"]
        Output: ["23 :)", "24 :("]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_NUM = "The length of input 'nums' should be equal to input 'N' and each element inside it should represent an integer value between 1 and 10^26.",
  OUT_OF_RANGE_N = "The length of input 'N' should be between 1 and 100.",
}

const isValid = (N: number, strNums: string[]) => {
  switch (true) {
    case N < 1 || N > 100: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case strNums.length !== N ||
      !strNums.reduce(
        (valid, strNum) =>
          valid && parseInt(strNum) >= 1 && parseInt(strNum) < Math.pow(10, 26),
        true
      ): {
      throw new Error(ErrorEnum.INVALID_NUM);
    }
    default: {
      return true;
    }
  }
};

const checkBaseTenDuplication = (strNums: string[], a: string) => {
  if (!strNums.length) return false;

  const duplication = strNums.reduce((duplication, b, i) => {
    const aStrings = a.split("").sort((a, b) => (a > b ? 1 : -1));
    const bStrings = b.split("").sort((a, b) => (a > b ? 1 : -1));

    if (aStrings.length !== bStrings.length) return duplication || false;

    return (
      duplication ||
      aStrings.reduce(
        (duplication, _, i, aStrings) =>
          duplication && aStrings[i] === bStrings[i],
        true
      )
    );
  }, false);

  return duplication;
};

const transform = (strNum: string) => {
  const splitted = strNum.split("");

  const reduced = splitted.reduce(
    (reduced, baseTen) => reduced + Math.pow(parseInt(baseTen), 2),
    0
  );

  return reduced.toString();
};

export const solution = (N: number, strNums: string[]) => {
  isValid(N, strNums);

  const mapped = strNums.map((num) => {
    let transformResults: string[] = [num];

    let foundHappy = false;
    let foundDuplication = false;

    while (!foundHappy && !foundDuplication) {
      const transformed = transform(
        transformResults[transformResults.length - 1]
      );

      foundHappy = transformed === "1";
      foundDuplication = checkBaseTenDuplication(transformResults, transformed);

      transformResults = [...transformResults, transformed];
    }

    return `${num} ${foundHappy ? ":)" : ":("}`;
  });

  return mapped;
};
