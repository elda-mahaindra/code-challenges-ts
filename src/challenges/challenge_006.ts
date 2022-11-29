/*
    Temperatures

    Analyze records of temperature to find the closest to zero.

    Rules
    Write a program that prints the temperature closest to 0 among input data. 
    If two numbers are equally close to zero, positive integer has to be considered closest to zero (for instance, if the temperatures are -5 and 5, then display 5).

    Input
        • N:  the number of temperatures to analyze.
        • inputs: A string with the N temperatures expressed as integers ranging from -273 to 5526 separated by space

    Output
    Display 0 (zero) if no temperatures are provided. Otherwise, display the temperature closest to 0.

    Constraints:
        • 0 ≤ N < 10000

    Example 1:
        Input: N = 5, inputs = "1 -2 -8 4 5"
        Output: 1
    
    Example 2:
        Input: N = 0, inputs = ""
        Output: 0

    source: codingame
*/

export enum ErrorEnum {
  INVALID_INPUTS = "The numbers of temperatures contained inside the input 'inputs' should be equal to the input 'N'.",
  OUT_OF_RANGE_N = "The value of input 'N' should be between 0 and 9999.",
}

const isValid = (N: number, inputs: string) => {
  const inputLength = inputs.split(" ").length;

  switch (true) {
    case N < 0 || N >= 10000: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case inputLength !== N: {
      throw new Error(ErrorEnum.INVALID_INPUTS);
    }
    default: {
      return true;
    }
  }
};

const difference = (a: number, b: number) => Math.abs(a - b);

export const solution = (N: number, inputs: string) => {
  isValid(N, inputs);

  const temps = inputs.split(" ").map((input) => parseInt(input));

  const lowestTemps = temps.reduce((lowestTemps, temp, i) => {
    if (!i) return [temp];

    const diff1 = difference(0, temp);
    const diff2 = difference(0, lowestTemps[0]);

    if (diff1 > diff2) return lowestTemps;

    if (diff1 < diff2) return [temp];

    return [...lowestTemps, temp];
  }, [] as number[]);

  const lowestTemp = lowestTemps.sort((a, b) => (a < b ? 1 : -1))[0];

  return lowestTemp;
};
