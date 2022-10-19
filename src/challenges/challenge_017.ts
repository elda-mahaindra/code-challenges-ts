/*
    Asteroids

    You have been tasked with studying a region of space to detect potentially dangerous asteroids.
    You are given two pictures of the night sky of dimensions W*H, taken at two different times t1 and t2.
    For your convenience, asteroids have been marked with capital letters A to Z, the rest is empty space represented by a dot (.) .
    Using the information contained in those two pictures, determine the position of the asteroids at t3, and output a picture of the same region of the sky.

    If necessary, the final coordinates are to be rounded-down (floor).
    Asteroids travel at different altitudes (with A being the closest and Z the farthest from your observation point) and therefore cannot collide with each other during their transit.
    If two or more asteroids have the same final coordinates, output only the closest one.
    It is guaranteed that all asteroids at t1 will still be present at t2, that no asteroids are hidden in the given pictures, and that there is only one asteroid per altitude.

    NB: Because of the flooring operation, it is important that you choose a coordinate system with the origin at the top left corner and the y axis increasing in the downward direction.

    Input
        • W: the width of a sky picture.
        • H: the height of a sky picture.
        • t1: time where the first sky pictures was taken.
        • t2: time where the second sky pictures was taken.
        • t3: time where the position of the asteroids needs to be determined.
        • pictureRows: an array of strings where each string represents a row of picture 1 and picture 2, separated by a white space.

    Output
    An array of H strings where each string represents a row of state of the sky at t3.

    Constraints:
        • 0 < W ≤ H ≤ 20
        • 1 ≤ t1 ≤ t2 ≤ t3 ≤ 10000

    Example 1:
        Input: W = 5, H = 5, t1 = 1, t2 = 2, t3 = 3,
            pictureRows = [
                "A.... .A...",
                "..... .....",
                "..... .....",
                "..... .....",
                "..... .....",
            ]
        Output: [
            "..A..",
            ".....",
            ".....",
            ".....",
            ".....",
        ]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_PICTURE_ROWS = "The length of input 'pictureRows' should equal to the input 'H' and each row should be a valid row and has a length equal to 2W + 1.",
  OUT_OF_RANGE_H = "The value of input 'H' should be between input 'W' and 20.",
  OUT_OF_RANGE_T1 = "The value of input 't1' should be between 0 and input 't2'.",
  OUT_OF_RANGE_T2 = "The value of input 't2' should be between input 't1' and input 't3'.",
  OUT_OF_RANGE_T3 = "The value of input 't3' should be between input 't2' and 10000.",
  OUT_OF_RANGE_W = "The value of input 'W' should be between 1 and input 'H'.",
}

interface IAsteroid {
  name: string;
  positions: [[number, number], [number, number], [number, number]]; // represents x and y position at t1, t2, and t3
  movementPerSecond: [number, number]; // represents movement on x axis and y axis per second
}

const isValid = (
  W: number,
  H: number,
  t1: number,
  t2: number,
  t3: number,
  pictureRows: string[]
) => {
  switch (true) {
    case W < 1 || W > H: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_W);
    }
    case H < W || H > 20: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_H);
    }
    case t1 < 0 || t1 > t2: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_T1);
    }
    case t2 < t1 || t2 > t3: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_T2);
    }
    case t3 < t2 || t3 > 10000: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_T3);
    }
    case pictureRows.length !== H ||
      !pictureRows.reduce((valid, row) => {
        const splitted = row.split(" ");

        if (splitted.length !== 2 || splitted[0].length !== splitted[1].length)
          return false;

        if (splitted[0].length !== W) return false;

        return valid && true;
      }, true): {
      throw new Error(ErrorEnum.INVALID_PICTURE_ROWS);
    }
    default: {
      return true;
    }
  }
};

const generateEmptyPictureBoard = (W: number, H: number): string[][] => {
  const board = Array(H)
    .fill("")
    .map(() =>
      Array(W)
        .fill("")
        .map(() => ".")
    );

  return board;
};

export const solution = (
  W: number,
  H: number,
  t1: number,
  t2: number,
  t3: number,
  pictureRows: string[]
) => {
  isValid(W, H, t1, t2, t3, pictureRows);

  const [pic1, pic2] = pictureRows.reduce(
    (pics, row) => {
      const [row1, row2] = row.split(" ");

      const [pic1, pic2] = pics;

      return [
        [...pic1, row1],
        [...pic2, row2],
      ];
    },
    [[], []] as string[][]
  );

  let asteroids: IAsteroid[] = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const content = pic1[y][x];
      if (content !== ".") {
        asteroids = [
          ...asteroids,
          {
            name: content,
            positions: [
              [x, y],
              [0, 0],
              [0, 0],
            ],
            movementPerSecond: [0, 0],
          },
        ];
      }
    }
  }

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const content = pic2[y][x];
      if (content !== ".") {
        const index = asteroids.findIndex(
          (asteroid) => asteroid.name === content
        );

        asteroids = asteroids.map((asteroid, i) =>
          i === index
            ? {
                ...asteroid,
                positions: [
                  [...asteroid.positions[0]],
                  [x, y],
                  [...asteroid.positions[2]],
                ],
                movementPerSecond: [
                  (x - asteroid.positions[0][0]) / (t2 - t1),
                  (y - asteroid.positions[0][1]) / (t2 - t1),
                ],
              }
            : asteroid
        );
      }
    }
  }

  asteroids = asteroids.map((asteroid) => {
    const { positions, movementPerSecond } = asteroid;
    const [movementX, movementY] = movementPerSecond;
    const [_, pos2] = positions;

    const pos3: [number, number] = [
      pos2[0] + Math.floor(movementX * (t3 - t2)),
      pos2[1] + Math.floor(movementY * (t3 - t2)),
    ];

    return {
      ...asteroid,
      positions: [[...asteroid.positions[0]], [...asteroid.positions[1]], pos3],
    };
  });

  const sorted = [...asteroids].sort((a, b) => (a.name > b.name ? 1 : -1));

  const picture3Board = generateEmptyPictureBoard(W, H);

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const found = sorted.find(
        (asteroid) =>
          asteroid.positions[2][0] === x && asteroid.positions[2][1] === y
      );

      if (found) picture3Board[y][x] = found.name;
    }
  }

  const picture3 = picture3Board.map((row) => row.join(""));

  return picture3;
};
