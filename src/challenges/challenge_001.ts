/*
    Most Repeated Character

    Given a string 's', return the most frequent character (an alphabet letter) inside string 's'.

    Constraints:
      • 1 <= s.length <= 100
      • s contains lower-case and upper-case English letters and numbers

    Example 1:
      Input: s = "abcddefda1111133333333"
      Output: 'd'
    
    Example 2:
      Input: s= "AA0AB0BB0ccc0aa0aw00wo0BBBw123123"
      Output: 'B'
    
    source: turing
*/

export enum ErrorEnum {
  INVALID_S = "The string input 's' should contain at least one alphabet letter.",
  OUT_OF_RANGE_S = "The length of input 's' should be between 1 and 100.",
}

interface IStatus {
  char: string;
  occurence: number;
}

const isValid = (s: string) => {
  switch (true) {
    case s.length < 1 || s.length > 100: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_S);
    }
    // ensure there is at least one alphabet letter in the input string
    case !s.split("").reduce((res, c) => res || /[a-zA-Z]/.test(c), false): {
      throw new Error(ErrorEnum.INVALID_S);
    }
    default: {
      return true;
    }
  }
};

export const solution = (s: string) => {
  isValid(s);

  const statuses = s
    .split("")
    .sort((a, b) => (a > b ? 1 : -1))
    .reduce((statuses, v, i, sorted) => {
      if (!/[a-zA-Z]/.test(v)) return statuses;

      const found = statuses.find((status) => status.char === v);

      if (!found) return [...statuses, { char: v, occurence: 1 }];

      return statuses.map((status) => {
        const { char, occurence } = status;

        if (char === v) return { ...status, occurence: occurence + 1 };

        return status;
      });
    }, [] as IStatus[]);

  const sorted = statuses.sort((a, b) => (a.occurence < b.occurence ? 1 : -1));

  return sorted[0].char;
};
