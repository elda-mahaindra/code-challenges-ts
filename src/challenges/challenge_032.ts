/*
    Prefix Code

    Given a fixed set of characters, a code is a table that gives the encoding to use for each character.

    A prefix code is a code with the prefix property, which is that there is no character with an encoding that is a prefix (initial segment) of the encoding of another character.


    Your goal is to decode an encoded string using the given prefix code, or say that is not possible.

    Example of encoding.
    Given the string "abracadabra" and the prefix code:
    a -> 1
    b -> 001
    c -> 011
    d -> 010
    r -> 000
    The resulting encoding is: 10010001011101010010001

    Thus, if your are given the code above and the input 10010001011101010010001, you should output the string "abracadabra".

    With the same prefix code, if the input is 0000, then you should tell that there is an error at index 3. 
    Indeed, the first three characters of this input can be decoded to give an 'r', but that leaves 0, which cannot be decoded.

    Input
        • n: an integer represents the number of association in the prefix-code table.
        • associations: an array of n strings where each string represents the association of a binary code (Bi) and an integer (Ci) separated by a space, 
            which tells that the character with ASCII code Ci will be encoded by Bi.
        • s: a string that represents the binary code of an encoded string.

    Output
    • If it is not possible to decode the encoded string, print DECODE FAIL AT INDEX i 
        with i is the first index in the encoded string where the decoding fails (index starts from 0).
    • Otherwise print the decoded string.

    Constraints:
    • 0 ≤ n ≤ 127
    • 0 ≤ Ci ≤ 127
    • length of S <= 5000
    • length of Bi <= 5000

    Example 1:
        Input: 
            n = 5,
            associations = [
                "1 97",
                "001 98",
                "000 114",
                "011 99",
                "010 100",
            ],
            s = "10010001011101010010001"
        Output: "abracadabra"

    source: codingame
*/

export enum ErrorEnum {
  INVALID_ASSOCIATIONS = "The number of associations inside input 'associations' should equal to the input 'N' and each associations should be a valid associations according to the constraints.",
  OUT_OF_RANGE_N = "The value of input 'N' should be between 0 and 127.",
  OUT_OF_RANGE_S = "The length of input 's' should less than or equal to 5000.",
}

interface IAssociation {
  b: string; // binary code
  c: number; // ASCII code
}

const isValid = (n: number, associations: string[], s: string) => {
  switch (true) {
    case n < 0 || n > 127: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case s.length > 5000: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_S);
    }
    case associations.length !== n ||
      !associations.reduce((valid, association) => {
        const [b, c] = association.split(" ");

        const validB = b.length <= 5000;
        const validC = parseInt(c) >= 0 && parseInt(c) <= 127;

        return valid && validB && validC;
      }, true): {
      throw new Error(ErrorEnum.INVALID_ASSOCIATIONS);
    }
    default: {
      return true;
    }
  }
};

export const solution = (n: number, associations: string[], s: string) => {
  isValid(n, associations, s);

  const associationsTable = associations.map((association): IAssociation => {
    const splitted = association.split(" ");

    return { b: splitted[0], c: parseInt(splitted[1]) };
  });

  let decoded = "";
  let remainingS = s;
  let decodedCount = 0;
  let decodingFail = false;

  while (remainingS.length) {
    if (decodingFail) break;

    for (let i = 0; i < remainingS.length; i++) {
      const currentB = remainingS.slice(0, i + 1);

      const found = associationsTable.find(
        (association) => association.b === currentB
      );

      if (found) {
        decoded = decoded.concat(String.fromCharCode(found.c));
        decodedCount += found.b.length;
        remainingS = remainingS.slice(found.b.length);
        break;
      } else if (i === remainingS.length - 1) {
        decodingFail = true;
        break;
      }
    }
  }

  return decodingFail ? `DECODE FAIL AT INDEX ${decodedCount}` : decoded;
};
