/*
    Bruce Lee

    Your program must decode the encoded message from the Chuck Norris encoding project.

    It is strongly recommended to have done the Chuck Norris project.
    Link -> https://www.codingame.com/training/easy/chuck-norris

    Here are some reminders about the Chuck Norris encoding method:
    - The encoded message is unary, containing only sequences of zeroes separated by spaces.
    - These sequences of zeroes always come in pairs.
    - The first sequence of a pair can be either 0 or 00, which represent the binary bits 1 and 0 respectively.
    - The second sequence of a pair is made of k zeroes, where k is the number of time the previous bit has to be printed in order to decode the message.

    For instance, if we want to encode the character A, we first start to write down the 7-bit ASCII code for A which is 1000001 in binary. (We only use 7 bits because the first bit is always zero so it's ignored).
    Then we turn the binary into unary as follows:
    1000001 -> 0 0 (bit 1, one time)
    1000001 -> 00 00000 (bit 0, five times)
    1000001 -> 0 0 (bit 1, one time)
    Therefore, the encoded message is 0 0 00 00000 0 0.

    You are asked to do the reverse process, and thus print A when given the message 0 0 00 00000 0 0.
    If the input is invalid, just print INVALID.

    Input
        • encoded: an encoded string message of N characters.

    Output
    The decoded message, or the word INVALID when the input is not valid.

    Constraints:
        • 0 < N < 4096

    Example 1:
        Input: encoded = "0 0 00 00000 0 0"
        Output: "A"

    source: codingame
*/

export enum ErrorEnum {
  OUT_OF_RANGE_ENCODED = "The length of input 'encoded' should be between 1 and 4095.",
}

const isValid = (encoded: string) => {
  switch (true) {
    case encoded.length < 1 || encoded.length > 4095: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_ENCODED);
    }
    default: {
      return true;
    }
  }
};

const unaryToBinaryStrings = (unary: string) => {
  const splitted = unary.split(" ");

  if (splitted.length % 2) return "INVALID";

  let binaryStrings = "";
  for (let i = 0; i < splitted.length; i += 2) {
    const [firstBlock, secondBlock] = [splitted[i], splitted[i + 1]];

    if (firstBlock !== "0" && firstBlock !== "00") return "INVALID";

    for (let j = 0; j < secondBlock.length; j++) {
      binaryStrings = binaryStrings.concat(firstBlock === "0" ? "1" : "0");
    }
  }

  return binaryStrings;
};

const binaryToChar = (binary: string) =>
  String.fromCharCode(parseInt(binary, 2));

export const solution = (encoded: string) => {
  isValid(encoded);

  const binaryStrings = unaryToBinaryStrings(encoded);

  if (binaryStrings === "INVALID" || binaryStrings.length % 7) return "INVALID";

  let binaries: string[] = [];
  for (let i = 0; i < binaryStrings.length; i += 7) {
    binaries = [...binaries, binaryStrings.slice(i, i + 7)];
  }

  const decoded = binaries.reduce(
    (decoded, binary) => decoded.concat(binaryToChar(binary)),
    ""
  );

  return decoded;
};
