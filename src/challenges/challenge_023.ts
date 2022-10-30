/*
    Bijective Numeration

    Decimal isn't the only base ten positional numbering system!

    Write a simple calculator that operates entirely in "decimary" notation to sum a list of positive integer values. 
    Decimary is a fun name for what mathematics calls bijective numeration base ten, which uses A to represent ten and lacks a zero digit.

    The system is better illustrated than explained. Starting from one, these numerals are written:

    1, 2, 3, 4, 5, 6, 7, 8, 9, A = ten, 11, 12, 13, 14, 15, 16, 17, 18, 19, 1A = ten plus ten = twenty, 21, 22, 23, 24, 25, 26, 27, 28, 29, 2A = thirty, 31, ...

    88, 89, 8A = ninety, 91, 92, 93, 94, 95, 96, 97, 98, 99, 9A = ninety plus ten = one hundred, A1 = a hundred and one, A2, A3, A4, A5, A6, A7, A8, A9, AA = a hundred and ten, 111, ...

    199, 19A = two hundred, 1A1 = two hundred and one, ...

    Input
        • count: an integer count represents the number of decimaries.
        • decimaryInputs: a string that consist of 'count' decimary values separated by a space.

    Output
    A string in "decimary" notation representing the summation.

    Constraints:
    • 2 ≤ count < 10
    • 1 ≤ length of each decimary representation < 10

    Example 1:
        Input: count = 3, message = "A A 12", 
        Output: "32"

    source: codingame
*/

export enum ErrorEnum {
  INVALID_DECIMARY = "The number of decimaries inside input 'decimaries' should equal to the input 'count' and each decimary should be a valid decimary according to the constraints.",
  OUT_OF_RANGE_COUNT = "The value of input 'count' should be between 2 and 9.",
}

const isValid = (count: number, decimaryInputs: string) => {
  const decimaries = decimaryInputs.split(" ");

  switch (true) {
    case count < 2 || count > 9: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_COUNT);
    }
    case decimaries.length !== count ||
      !decimaries.reduce(
        (valid, decimary) =>
          valid && decimary.length >= 1 && decimary.length < 10,
        true
      ): {
      throw new Error(ErrorEnum.INVALID_DECIMARY);
    }
    default: {
      return true;
    }
  }
};

/*
  encode and decode flows
  10  = A = (10 * 10^0) = 10
    => 1 0, proceed from right to left
      =>  step 1: 
          digit is 0
          take 1 from next digit on the left, it become 10
          return 10 as A
      =>  step 2: 
          digit is 1
          taken 1 by previous digit on the right, it become 1 - 1 = 0
          no other digits on the left so return 0
      =>  result:
          0A, the leading zero should be ignored
          A

  20  = 1A  = ( 1 * 10^1) + (10 * 10^0)  = 10 + 10  = 20
    => 2 0, proceed from right to left
      =>  step 1:
          digit is 0
          take 1 from next digit on the left, it become 10
          return 10 as A
      =>  step 2:
          digit is 2
          taken 1 by previous digit on the right, it become 2 - 1 = 1
          return 1
      =>  result:
          1A

  100 = 9A  = ( 9 * 10^1) + (10 * 10^0)  = 90 + 10  = 100
    => 1 0 0, proceed from right to left
      =>  step 1:
          digit is 0
          take 1 from next digit on the left, it become 10
          return 10 as A
      =>  step 2:
          digit is 0
          take 1 from next digit on the left, it become 10
          taken by previous digit on the right, it become 10 - 1 = 9
          return 9
      =>  result:
          9A

  101 = A1  = (10 * 10^1) + ( 1 * 10^0)  = 100 + 1  = 101
    => 1 0 1, proceed from right to left
      =>  step 1:
          digit is 1
          return 1
      =>  step 2:
          digit is 0
          take 1 from next digit on the left, it become 10
          return 10 as A
      =>  digit is 1
          taken 1 by previous digit on the right, it become 1 - 1 = 0
          no other digits on the left so return 0
      =>  result:
          0A1, the leading zero should be ignored
          A1

  110 = AA  = (10 * 10^1) + (10 * 10^0)  = 100 + 10 = 110

  120 = 11A = (1 * 10^2) + (1 * 10^1) + (10 * 10^0)  = 100 + 10 + 10 = 120 

  130 = 12A = (1 * 10^2) + (2 * 10^1) + (10 * 10^0)  = 100 + 20 + 10 = 130

  200 = 19A = (1 * 10^2) + (9 * 10^1) + (10 * 10^0)  = 100 + 90 + 10 = 200

  201 = 1A1 = (1 * 10^2) + (10 * 10^1) + (1 * 10^0) = 100 + 100 + 1 = 201

  205 = 1A5 = (1 * 10^2) + (10 * 10^1) + (5 * 10^0) = 100 + 100 + 5 = 205

  210 = 1AA = (1 * 10^2) + (10 * 10^1) + (10 * 10^0) = 100 + 100 + 10 = 210

  860 = 85A - (8 * 10^2) + (5 * 10^1) + (10 * 10^0) = 800 + 50 + 10 = 860
    => 8 6 0, proceed from right to left
      =>  step 1: 
          digit is 0
          take 1 from next digit on the left, it become 10
          return 10 as A
      =>  step 2:
          digit is 6
          taken by previous digit on the right, it become 6 - 1 = 5
          return 5
      =>  step 3:
          digit is 8
          return 8
      =>  result:
          85A

  8060 = 7A5A = (7 * 10^3) + (10 * 10^2) + (5 * 10^1) + (10 * 10^0) = 7000 +1000 + 50 + 10 = 8060

  8010 = 79AA = (7 * 10^3) + (9 * 10^2) + (10 * 10^1) + (10 * 10^0) = 7000 + 900 + 100 + 10 = 8010
    => 8 0 1 0, proceed from right to left
      =>  step 1: 
          digit is 0
          take 1 from next digit on the left, it become 10
          return 10 as A
      =>  step 2:
          digit is 1
          taken by previous digit on the right, it become 1 - 1 = 0
          take 1 from next digit on the left, it become 10
          return 10 as A
      =>  step 3:
          digit is 0
          take 1 from next digit on the left, it become 10
          taken by previous digit on the right, it become 10 - 1 = 9
          return 9
      =>  step 4:
          digit is 8
          taken by previous digit on the right, it become 8 - 1 = 7
          return 7
      =>  result:
          79AA
*/

const decimaryToDecimal = (decimary: string) => {
  const splitted = decimary.split("");

  const decimal = splitted.reduce((decimal, letter, i) => {
    const maxPower = decimary.length - 1;
    const power = Math.abs(i - maxPower);

    return (
      decimal + (letter === "A" ? 10 : parseInt(letter)) * Math.pow(10, power)
    );
  }, 0);

  return decimal;
};

const decimalToDecimary = (decimal: number) => {
  if (!decimal.toString().includes("0")) return decimal.toString();

  let decimary = "";

  let remainder = decimal;
  while (remainder) {
    const splitted = remainder.toString().split("");
    const lastIndex = splitted.length - 1;
    const lastDigit = splitted[lastIndex];

    if (lastDigit !== "0") {
      decimary = `${lastDigit}${decimary}`;
      splitted.splice(lastIndex, 1);

      remainder = parseInt(splitted.join(""));
    } else {
      decimary = `A${decimary}`;
      splitted.splice(lastIndex, 1);

      remainder = parseInt(splitted.join("")) - 1;
    }
  }

  return decimary;
};

export const solution = (count: number, decimaryInputs: string) => {
  isValid(count, decimaryInputs);

  const decimaries = decimaryInputs.split(" ");

  const decimals = decimaries.map((decimary) => decimaryToDecimal(decimary));

  const sum = decimals.reduce((sum, decimal) => sum + decimal, 0);

  const decimary = decimalToDecimary(sum);

  return decimary;
};
