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
  ALPHABET_NOT_FOUND = "The string input 's' should contain at least one alphabet letter.",
  MAX_LENGTH_REACHED = "The length of the string input 's' should not exceed 100 characters.",
  MIN_LENGTH_REACHED = "The string input 's' should contain at least one alphabet letter.",
}

interface IStatus {
  char: string;
  occurence: number;
}

const isValid = (s: string) => {
  switch (true) {
    case s.length < 1: {
      throw new Error(ErrorEnum.MIN_LENGTH_REACHED);
    }
    case s.length > 100: {
      throw new Error(ErrorEnum.MAX_LENGTH_REACHED);
    }
    // ensure there is at least one alphabet letter in the input string
    case !s.split("").reduce((res, c) => res || /[a-zA-Z]/.test(c), false): {
      throw new Error(ErrorEnum.ALPHABET_NOT_FOUND);
    }
    default: {
      return true;
    }
  }
};

export const solution = (s: string) => {
  if (isValid(s)) {
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

    const sorted = statuses.sort((a, b) =>
      a.occurence < b.occurence ? 1 : -1
    );

    return sorted[0].char;
  }
};
