/*
    Should Bakers be Frugal?

    Background/terms:
    • A biscuit is round (a circle)
    • Measurements are in inches (not necessarily full inches)
    • When a Baker has a flattened-out square of dough ("DoughSquare"), he will cut-out biscuits (in grid-style orderly columns and rows) until no more biscuits can be cut-out

    The difference:
    There are two types of Bakers: "Wasteful" and "Frugal":
    • A Wasteful Baker will stop there, and throw away the remaining dough ☹️
    • A Frugal Baker will take the remaining dough and re-form it into another (smaller) DoughSquare, and repeat the cutting process. He will continue to do this until no full-biscuit can be cut-out.

    NOTE: At the end, there might be enough dough left to manually shape into a circle of the required diameter, but the Baker is not allowed to do this. In order to make a biscuit, the DoughSquare itself must be big enough so that the Baker can place the biscuit cutter fully on it.

    The question:
    Given the length of a side of the starting DoughSquare, and the diameter of the biscuit cutter, how many more biscuits can a Frugal Baker cut-out than a Wasteful Baker?

    Input
        • side: a float that represents the side of the starting dough square.
        • diameter: a float that represents the diameter of the biscuit cutter.

    Output
    an integer that represents how many more biscuits a Frugal Baker makes than a Wasteful Baker.

    Constraints:
    • 0 < diameter < side < 100

    Example 1:
        Input: side = 3, diameter = 1
        Output: 2

    source: codingame
*/

export enum ErrorEnum {
  OUT_OF_RANGE_DIAMETER = "The value of input 'diameter' should be more than 0 and less the value of input 'side'.",
  OUT_OF_RANGE_SIDE = "The value of input 'side' should be more than the value of input 'diameter' and less than 100.",
}

const isValid = (side: number, diameter: number) => {
  switch (true) {
    case diameter <= 0 || diameter >= side: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_DIAMETER);
    }
    case side <= diameter || side >= 100: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_SIDE);
    }
    default: {
      return true;
    }
  }
};

export const solution = (side: number, diameter: number) => {
  isValid(side, diameter);

  let wastefulBakerMade = -1;
  let frugalBakerMade = -1;

  const doughSquarePerBiscuit = Math.pow(diameter, 2);
  const biscuitCircle = (Math.PI / 4) * Math.pow(diameter, 2);

  let remainingDoughSquare = Math.pow(side, 2);

  while (remainingDoughSquare >= doughSquarePerBiscuit) {
    const currentSide = Math.pow(remainingDoughSquare, 0.5);

    const made = Math.pow(Math.floor(currentSide / diameter), 2);

    if (wastefulBakerMade < 0) {
      wastefulBakerMade += made + 1;
      frugalBakerMade += made + 1;
    } else {
      frugalBakerMade += made;
    }

    remainingDoughSquare -= made * biscuitCircle;
  }

  return frugalBakerMade - wastefulBakerMade;
};
