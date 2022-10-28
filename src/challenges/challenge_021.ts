/*
    Substitution Encoding

    You want to easily encode and decode messages with a simple and personalized method. To do so, you will use a substitution method.

    The principle is simple, you have a comparison table like this one:

    A B
    C D

    and a message to encode written with the characters available in your table:

    CBA

    You are going to take each of the characters that compose the message and replace them by its position in the table:

    C => 10 (row 1 column 0)
    B => 01 (row 0 column 1)
    A => 00 (row 0 column 0)

    The message becomes: 100100

    Input
        • n: an integer n represents the number of rows in comparison table.
        • rows: an array of n string which each string represents the row of comparison table and composed of characters separated by a space.
        • message: a string message to encode.

    Output
    The encoded message.

    Constraints:
    • 1 ≤ n ≤ 10

    Example 1:
        Input: 
            n = 2, 
            rows = [
                "A B",
                "C D",
            ],
            message = "CBA", 
        Output: "100100"

    source: codingame
*/

export enum ErrorEnum {
  INVALID_ROWS = "The length of input 'rows' should equal to the input 'n' and each row should be a valid row which composed by some single characters separated by a space.",
  OUT_OF_RANGE_N = "The value of input 'N' should be between 1 and 10.",
}

interface ICharMap {
  char: string;
  position: [number, number];
}

const isValid = (n: number, rows: string[]) => {
  switch (true) {
    case n < 1 || n > 10: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case rows.length !== n ||
      !rows.reduce((valid, row) => {
        const splitted = row.split(" ");

        return (
          valid &&
          splitted.reduce((valid, char) => valid && char.length === 1, true)
        );
      }, true): {
      throw new Error(ErrorEnum.INVALID_ROWS);
    }
    default: {
      return true;
    }
  }
};

export const solution = (n: number, rows: string[], message: string) => {
  isValid(n, rows);

  const charMaps = rows.reduce((charMaps, row, x) => {
    const splitted = row.split(" ");

    let maps: ICharMap[] = [];
    for (let y = 0; y < splitted.length; y++) {
      maps = [...maps, { char: splitted[y], position: [x, y] }];
    }

    return [...charMaps, ...maps];
  }, [] as ICharMap[]);

  const encoded = message
    .split("")
    .map((letter) => {
      const found = charMaps.find((charMap) => charMap.char === letter)!;
      const [x, y] = found.position;

      return `${x}${y}`;
    })
    .join("");

  return encoded;
};
