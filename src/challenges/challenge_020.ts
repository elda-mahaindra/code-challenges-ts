/*
    Disordered First Contact

    Finally, we have received the first messages from aliens! Unfortunately, we cannot understand them because they have a very unique way of speaking.

    Here is how aliens encode their messages:
    - At each step of the encoding, they remove a bigger part from the beginning of the original message, starting from 1 character only. First, they take the first character, then 2 characters, then 3, etc...
    - Starting from an empty result string, they add each part taken from the original message alternatively at the end and at the beginning of the result string. They add the first part at the end, the second part at the beginning, the third part at the end, etc...

    Example
    abcdefghi becomes ghibcadef

    1) Take "a" from abcdefghi, add it at the end of an empty string -> a
    2) Take "bc" from bcdefghi, add it at the beginning of a -> bca
    3) Take "def" from defghi, add it at the end of bca -> bcadef
    4) Take the remaining characters "ghi" and add it at the beginning of bcadef -> ghibcadef

    Your job here is to decode or encode the messages to discuss with aliens.

    Input
        • N: an integer N indicating the number of times the message was transformed. If N is positive you have to decode i.e. retrieve the original message. If N is negative you have to encode i.e. transform the message.
        • message: a string message to be decoded or encoded.

    Output
    The encoded or decoded message, depend on the N.

    Constraints:
    • -10 ≤ N ≤ 10
    • 0 < message length < 1024

    Example 1:
        Input: N = 1, message = "ghibcadef"
        Output: "abcdefghi"

    source: codingame
*/

export enum ErrorEnum {
  OUT_OF_RANGE_MESSAGE = "The length of input 'message' should be between 1 and 1023.",
  OUT_OF_RANGE_N = "The length of input 'N' should be between -10 and 10.",
}

const isValid = (N: number, message: string) => {
  switch (true) {
    case message.length < 1 || message.length > 1023: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_MESSAGE);
    }
    case N < -10 || N > 10: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    default: {
      return true;
    }
  }
};

const encode = (message: string) => {
  const letters = message.split("");
  let index = 0;
  let encoded = "";

  while (letters.length) {
    let spliced: string[] = [];

    if (letters.length > index + 1) spliced = letters.splice(0, index + 1);
    else spliced = letters.splice(0, letters.length);

    encoded =
      index % 2
        ? `${spliced.join("")}${encoded}`
        : `${encoded}${spliced.join("")}`;

    index++;
  }

  return encoded;
};

const getDecodeSteps = (message: string) => {
  let letters = message.split("");
  let index = 0;
  let steps: { count: number; end: boolean }[] = [];

  while (letters.length) {
    let spliced: string[] = [];

    if (letters.length > index + 1) spliced = letters.splice(0, index + 1);
    else spliced = letters.splice(0, letters.length);

    steps = [
      { count: spliced.length, end: steps.length ? !steps[0].end : true },
      ...steps,
    ];
    index++;
  }

  return steps;
};

const decode = (message: string) => {
  const decodeSteps = getDecodeSteps(message);
  console.log("decodeSteps.length: ", decodeSteps.length);

  let letters = message.split("");
  let decoded = "";

  let spliced: string[] = [];

  decodeSteps.forEach((step, i) => {
    const { count, end } = step;
    if (end) spliced = letters.splice(letters.length - count, count);
    else spliced = letters.splice(0, count);

    decoded = spliced.join("").concat(decoded);
  });

  return decoded;
};

export const solution = (N: number, message: string) => {
  isValid(N, message);

  let result = message;
  for (let i = 0; i < Math.abs(N); i++) {
    result = N < 0 ? encode(result) : decode(result);
  }

  return result;
};
