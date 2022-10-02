/*
    Unary

    Binary with 0 and 1 is good, but binary with only 0, or almost, is even better!

    Write a program that takes an incoming message as input and displays as output the message encoded using this method.

    Rules
    Here is the encoding principle:
    • The input message consists of ASCII characters (7-bit)
    • The encoded output message consists of blocks of 0
    • A block is separated from another block by a space
    • Two consecutive blocks are used to produce a series of same value bits (only 1 or 0 values):
        - First block: it is always 0 or 00. If it is 0, then the series contains 1, if not, it contains 0
        - Second block: the number of 0 in this block is the number of bits in the series

    Let’s take a simple example with a message which consists of only one character: Capital C. C in binary is represented as 1000011, so with this method, this gives:
    • 0 0 (the first series consists of only a single 1)
    • 00 0000 (the second series consists of four 0)
    • 0 00 (the third consists of two 1)
    So C is coded as: 0 0 00 0000 0 00

    
    Second example, we want to encode the message CC (i.e. the 14 bits 10000111000011) :
    • 0 0 (one single 1)
    • 00 0000 (four 0)
    • 0 000 (three 1)
    • 00 0000 (four 0)
    • 0 00 (two 1)
    So CC is coded as: 0 0 00 0000 0 000 00 0000 0 00

    Input
        • message: a string message to be encoded consisting of N ASCII characters (without carriage return).

    Output
    The encoded message.

    Constraints:
        • 0 < N < 100

    Example 1:
        Input: message = "C"
        Output: "0 0 00 0000 0 00"

    Example 2:
        Input: message = "CC"
        Output: "0 0 00 0000 0 000 00 0000 0 00"

    source: codingame
*/

export enum ErrorEnum {
  OUT_OF_RANGE_MESSAGE = "The length of input 'message' should be between 1 and 99.",
  INVALID_BINARY = "Expecting a binary string which each value represented by '0' or '1'.",
}

interface IStatus {
  char: string;
  occurence: number;
}

const isValid = (message: string) => {
  switch (true) {
    case message.length <= 0 || message.length >= 100: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_MESSAGE);
    }
    default: {
      return true;
    }
  }
};

const textToBinary = (text: string) =>
  text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(7, "0"))
    .join("");

const binaryToUnary = (binary: string) => {
  if (!/^[0-1]{1,}/.test(binary)) throw new Error(ErrorEnum.INVALID_BINARY);

  const splitted = binary.split("");

  const statuses = splitted.reduce((reduced, char, i) => {
    if (!i) return [{ char, occurence: 1 }];
    else if (char !== reduced[reduced.length - 1].char)
      return [...reduced, { char, occurence: 1 }];
    else
      return reduced.map((el, i) =>
        i === reduced.length - 1 ? { ...el, occurence: el.occurence + 1 } : el
      );
  }, [] as IStatus[]);

  const unary = statuses.reduce(
    (unary, status, i) =>
      unary.concat(
        `${i ? " " : ""}${status.char === "1" ? "0" : "00"} ${Array(
          status.occurence
        )
          .fill("0")
          .join("")}`
      ),
    ""
  );

  return unary;
};

export const solution = (message: string) => {
  isValid(message);

  const binary = textToBinary(message);

  const unary = binaryToUnary(binary);

  return unary;
};
