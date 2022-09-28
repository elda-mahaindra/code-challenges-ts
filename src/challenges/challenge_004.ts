/*
    Power of Thor - Episode 1

    Thor moves on a map which is 40 wide by 18 high. Note that the coordinates (X and Y) start at the top left! 
    This means the most top left cell has the coordinates "X=0,Y=0" and the most bottom right one has the coordinates "X=39,Y=17".

    At the end of the game turn, you must output the direction in which you want Thor to go among:
    N (North), NE (North-East), E (East), SE (South-East), S (South), SW (South-West), W (West), NW (North-West)

    Each movement makes Thor move by 1 cell in the chosen direction.

    Input
        • lightX: the X position of the light of power that Thor must reach.
        • lightY: the Y position of the light of power that Thor must reach.
        • initialTx: the starting X position of Thor.
        • initialTy: the starting Y position of Thor.

    Output
    The direction in which you want Thor to go.

    Constraints:
        • 0 ≤ lightX < 40
        • 0 ≤ lightY < 18
        • 0 ≤ initialTx < 40
        • 0 ≤ initialTy < 18

    Example 1:
        Input: lightX = 3, lightY = 8, initialTx = 3, initialTy = 6
        Output: S S
    
    Example 2:
        Input: lightX = 3, lightY = 6, initialTx = 3, initialTy = 8
        Output: N N

    source: codingame
*/

export enum ErrorEnum {
  OUT_OF_RANGE_LIGHT_X = "The value of input 'lightX' should be between 0 and 39.",
  OUT_OF_RANGE_LIGHT_Y = "The value of input 'lightY' should be between 0 and 17.",
  OUT_OF_RANGE_INITIAL_TX = "The value of input 'initialTx' should be between 0 and 39.",
  OUT_OF_RANGE_INITIAL_TY = "The value of input 'initialTx' should be between 0 and 17.",
}

const moveDirections: [string, number, number][] = [
  ["N", 0, -1],
  ["NE", 1, -1],
  ["E", 1, 0],
  ["SE", 1, 1],
  ["S", 0, 1],
  ["SW", -1, 1],
  ["W", -1, 0],
  ["NW", -1, -1],
];

const isValid = (
  lightX: number,
  lightY: number,
  initialTx: number,
  initialTy: number
) => {
  switch (true) {
    case lightX < 0 || lightX >= 40: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_LIGHT_X);
    }
    case lightY < 0 || lightY >= 18: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_LIGHT_Y);
    }
    case initialTx < 0 || initialTx >= 40: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_INITIAL_TX);
    }
    case initialTy < 0 || initialTy >= 18: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_INITIAL_TY);
    }
    default: {
      return true;
    }
  }
};

export const solution = (
  lightX: number,
  lightY: number,
  initialTx: number,
  initialTy: number
) => {
  isValid(lightX, lightY, initialTx, initialTy);

  let moves = "";

  let distanceXLeft = lightX - initialTx;
  let distanceYLeft = lightY - initialTy;

  while (!(distanceXLeft === 0 && distanceYLeft === 0)) {
    if (distanceXLeft === 0) {
      if (distanceYLeft === 0) return moves.trim();

      const found = moveDirections.find(
        (dir) =>
          dir[1] === 0 && (distanceYLeft > 0 ? dir[2] === 1 : dir[2] === -1)
      )!;

      moves = moves.concat(` ${found[0]}`);
      distanceYLeft = distanceYLeft + (distanceYLeft > 0 ? -1 : 1);
    } else if (distanceYLeft === 0) {
      if (distanceXLeft === 0) return moves.trim();

      const found = moveDirections.find(
        (dir) =>
          (distanceXLeft > 0 ? dir[1] === 1 : dir[1] === -1) && dir[2] === 0
      )!;

      moves = moves.concat(` ${found[0]}`);
      distanceXLeft = distanceXLeft + (distanceXLeft > 0 ? -1 : 1);
    } else if (distanceXLeft > 0) {
      const found = moveDirections.find(
        (dir) =>
          dir[1] === 1 && (distanceYLeft > 0 ? dir[2] === 1 : dir[2] === -1)
      )!;

      moves = moves.concat(` ${found[0]}`);
      distanceYLeft = distanceYLeft + (distanceYLeft > 0 ? -1 : 1);
    } else if (distanceXLeft < 0) {
      const found = moveDirections.find(
        (dir) =>
          dir[1] === -1 && (distanceYLeft > 0 ? dir[2] === 1 : dir[2] === -1)
      )!;

      moves = moves.concat(` ${found[0]}`);
      distanceYLeft = distanceYLeft + (distanceYLeft > 0 ? -1 : 1);
    } else if (distanceYLeft > 0) {
      const found = moveDirections.find(
        (dir) =>
          (distanceXLeft > 0 ? dir[1] === 1 : dir[1] === -1) && dir[2] === 1
      )!;

      moves = moves.concat(` ${found[0]}`);
      distanceXLeft = distanceXLeft + (distanceXLeft > 0 ? -1 : 1);
    } else {
      const found = moveDirections.find(
        (dir) =>
          (distanceXLeft > 0 ? dir[1] === 1 : dir[1] === -1) && dir[2] === -1
      )!;

      moves = moves.concat(` ${found[0]}`);
      distanceXLeft = distanceXLeft + (distanceXLeft > 0 ? -1 : 1);
    }
  }

  return moves.trim();
};
