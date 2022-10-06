/*
    Horse-racing Duals

    Casablanca’s hippodrome is organizing a new type of horse racing: duals. 
    During a dual, only two horses will participate in the race. In order for the race to be interesting, it is necessary to try to select two horses with similar strength.

    Write a program which, using a given number of strengths, identifies the two closest strengths and shows their difference with an integer (≥ 0).

    Input
        • N:  Number N of horses.
        • powers: an array of numbers represents the strength Pi of each horse.

    Output
    The difference D between the two closest strengths. D is an integer greater than or equal to 0.

    Constraints:
        • 0 < N < 10000
        • 0 < Pi ≤ 10000000

    Example 1:
        Input: N = 3, powers = [5, 8, 9]
        Output: 1

    source: codingame
*/

export enum ErrorEnum {
  INVALID_POWERS = "The numbers of powers contained inside the input 'powers' should be equal to the input 'N'.",
  OUT_OF_RANGE_N = "The value of input 'N' should be between 1 and 9999.",
  OUT_OF_RANGE_P = "Each value 'Pi' inside the value of input 'powers' should be between 1 and 9999999.",
}

const isValid = (N: number, powers: number[]) => {
  switch (true) {
    case N < 0 || N >= 10000: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case powers.length !== N: {
      throw new Error(ErrorEnum.INVALID_POWERS);
    }
    // ensure each Pi inside powers following the constraint
    case powers.reduce(
      (invalid, power) => invalid || power <= 0 || power > 10000000,
      false
    ): {
      throw new Error(ErrorEnum.OUT_OF_RANGE_P);
    }
    default: {
      return true;
    }
  }
};

const difference = (a: number, b: number) => Math.abs(a - b);

export const solution = (N: number, powers: number[]) => {
  isValid(N, powers);

  const sorted = [...powers].sort((a, b) => (a > b ? 1 : -1));

  const cd = sorted.reduce((cd, power, i) => {
    if (i === 0) return cd;

    const diff = difference(power, sorted[i - 1]);

    if (diff < cd) return diff;

    return cd;
  }, 10000000);

  return cd;
};
