/*
    Encryption/Decryption of Enigma Machine

    During World War II, the Germans were using an encryption code called Enigma – which was basically an encryption machine that encrypted messages for transmission. The Enigma code went many years unbroken. Here's How the basic machine works:

    First Caesar shift is applied using an incrementing number:
    If String is AAA and starting number is 4 then output will be EFG.
    A + 4 = E
    A + 4 + 1 = F
    A + 4 + 1 + 1 = G

    Now map EFG to first ROTOR such as:
    ABCDEFGHIJKLMNOPQRSTUVWXYZ
    BDFHJLCPRTXVZNYEIWGAKMUSQO
    So EFG becomes JLC. Then it is passed through 2 more rotors to get the final value.

    If the second ROTOR is AJDKSIRUXBLHWTMCQGZNPYFVOE, we apply the substitution step again thus:
    ABCDEFGHIJKLMNOPQRSTUVWXYZ
    AJDKSIRUXBLHWTMCQGZNPYFVOE
    So JLC becomes BHD.

    If the third ROTOR is EKMFLGDQVZNTOWYHXUSPAIBRCJ, then the final substitution is:
    ABCDEFGHIJKLMNOPQRSTUVWXYZ
    EKMFLGDQVZNTOWYHXUSPAIBRCJ
    So BHD becomes KQF.

    Final output is sent via Radio Transmitter.

    Input
        • operation: a string represents the type of number which value is either "ENCODE" or "DECODE".
        • pseudoRandomNumber:  an integer represents the starting shift.
        • rotors: an array of three strings represents the three rotors that will be used in the process.
        • message: a string represents the message to be processed.

    Output
    Encoded or decoded string.

    Constraints:
        • 0 ≤ pseudoRandomNumber < 26
        • message consists only of uppercase letters (A-Z)
        • 1 ≤ message length < 50

    Example 1:
        Input: operation = "ENCODE", pseudoRandomNumber = 4, rotors = ["BDFHJLCPRTXVZNYEIWGAKMUSQO", "AJDKSIRUXBLHWTMCQGZNPYFVOE", "EKMFLGDQVZNTOWYHXUSPAIBRCJ"], message = "AAA"
        Output: "KQF"

    source: codingame
*/

const uppercaseAlphabetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export enum ErrorEnum {
  INVALID_MESSAGE = "The value of input 'message' should be between 1 and 49 letters and consists only of uppercase letters (A-Z).",
  INVALID_ROTORS = "Each rotor inside the value input 'rotor' should contain exactly 26 A-Z letters in any order.",
  OUT_OF_RANGE_PSEUDO_RANDOM_NUMBER = "The value of input 'pseudoRandomNumber' should be between 0 and 25.",
  OUT_OF_RANGE_ROTORS = "The length of input 'rotors' should be 3.",
}

const isValid = (
  pseudoRandomNumber: number,
  rotors: string[],
  message: string
) => {
  switch (true) {
    case pseudoRandomNumber < 0 || pseudoRandomNumber >= 26: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_PSEUDO_RANDOM_NUMBER);
    }
    case rotors.length !== 3: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_ROTORS);
    }
    case !/^[A-Z]{1,49}$/.test(message): {
      throw new Error(ErrorEnum.INVALID_MESSAGE);
    }
    // ensure each rotor has exactly 26 letters and doesn't have any letter dupication
    case rotors.reduce((valid, rotor) => {
      const duplication = [...rotor.split("")]
        .sort((a, b) => (a > b ? 1 : -1))
        .reduce(
          (duplication, letter, i, letters) =>
            i ? duplication || letter === letters[i - 1] : duplication,
          false
        );

      return (
        valid || duplication || rotor.length !== uppercaseAlphabetLetters.length
      );
    }, false): {
      throw new Error(ErrorEnum.INVALID_ROTORS);
    }
    default: {
      return true;
    }
  }
};

const encode = (
  pseudoRandomNumber: number,
  rotors: string[],
  message: string
) => {
  const shifted = message
    .split("")
    .map((letter, i) => {
      const temp1 = letter.charCodeAt(0) - "A".charCodeAt(0);
      const temp2 = temp1 + pseudoRandomNumber + i;
      const temp3 = temp2 % uppercaseAlphabetLetters.length;
      const charCode = temp3 + "A".charCodeAt(0);

      return String.fromCharCode(charCode);
    })
    .join("");

  const mappedToRotors = rotors.reduce(
    (mappedToRotors, rotor, i) =>
      i
        ? mappedToRotors
            .split("")
            .map((letter) => rotor[letter.charCodeAt(0) - "A".charCodeAt(0)])
            .join("")
        : shifted
            .split("")
            .map((letter) => rotor[letter.charCodeAt(0) - "A".charCodeAt(0)])
            .join(""),
    ""
  );

  return mappedToRotors;
};

const decode = (
  pseudoRandomNumber: number,
  rotors: string[],
  message: string
) => {
  let mappedBackFromRotors = "";
  for (let i = rotors.length - 1; i >= 0; i--) {
    if (i === rotors.length - 1) {
      mappedBackFromRotors = message
        .split("")
        .reduce(
          (mappedBackFromRotors, letter) =>
            mappedBackFromRotors.concat(
              uppercaseAlphabetLetters[rotors[i].indexOf(letter)]
            ),
          ""
        );
    } else {
      mappedBackFromRotors = mappedBackFromRotors
        .split("")
        .reduce(
          (mappedBackFromRotors, letter) =>
            mappedBackFromRotors.concat(
              uppercaseAlphabetLetters[rotors[i].indexOf(letter)]
            ),
          ""
        );
    }
  }

  const shiftedBack = mappedBackFromRotors
    .split("")
    .map((letter, i) => {
      const temp1 = letter.charCodeAt(0) - "A".charCodeAt(0);
      const temp2 = temp1 - pseudoRandomNumber - i;
      const temp3 = temp2 % uppercaseAlphabetLetters.length;
      const charCode =
        temp3 + (temp3 >= 0 ? "A".charCodeAt(0) : "Z".charCodeAt(0) + 1);

      return String.fromCharCode(charCode);
    })
    .join("");

  return shiftedBack;
};

export const solution = (
  operation: "ENCODE" | "DECODE",
  pseudoRandomNumber: number,
  rotors: string[],
  message: string
) => {
  isValid(pseudoRandomNumber, rotors, message);

  switch (operation) {
    case "ENCODE": {
      return encode(pseudoRandomNumber, rotors, message);
    }
    case "DECODE": {
      return decode(pseudoRandomNumber, rotors, message);
    }
    default: {
      return "";
    }
  }
};
