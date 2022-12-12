/*
    Surface

    "The wars of the 21st century will be fought over water."
    Although freshwater is available in limited quantity, it’s not actually scarce. 
    There’s more than enough to satisfy the current needs of the global population, 
    but only if it were possible to locate and measure the bodies of water available in a geographical area!

    Your mission is to pinpoint the surface areas of water. 
    You have a map which describes the contents of each square meter of a geographical zone. 
    One square meter is composed of either land or water. One map can contain several bodies of water.

    Your program receives as input a list of coordinates. 
    For each one you must determine the surface area of the lake which is located there. 
    If there is no lake, then the surface area equals 0.

    A map in ASCII format is provided as input. 
    The character # represents land and the letter O (uppercase) represents water. 

    ####
    ##O#
    #OO#
    ####

    A lake is made up of a set of water squares which are horizontally or vertically adjacent. 
    Two squares which are only diagonally adjacent are not part of the same lake.

    In this example, the lake which is located in coordinates (1, 2) has a surface area of 3 square meters.

    Input
        • L: an integer that represents the width of the map.
        • H: an integer that represents the height of the map.
        • rows: an array of H string where each string represents L squares of the map.
        • N: an integer that represents the number of coordinates to be tested.
        • coordinates: an array of string where each string represents the coordinate to be tested (X and Y separated by a space)

    Output
    An array of N integer where each integer represents the amount of surface areas of the lake located at the coordinates given in input.

    Constraints:
    • 0 < L < 10000
    • 0 < H < 10000
    • 0 ≤ X < L
    • 0 ≤Y < H
    • 0 < N < 1000

    Example 1:
        Input: 
            L = 4, 
            H = 4, 
            rows = [
                "####",
                "##O#",
                "#OO#",
                "####"
            ]
            N = 3, 
            coordinates = ["0 0", "1 2", "2 1"]
        Output: [0, 3, 3]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_COORDINATES = "The length of input 'coordinates' should be equal to input 'N' and each element inside it should represent a valid coordinate.",
  INVALID_ROWS = "The length of input 'rows' should be equal to input 'H' and each element inside it should be a string with the length of 'L' and consists of only '#' or 'O' character.",
  OUT_OF_RANGE_L = "The length of input 'L' should be between 1 and 9999.",
  OUT_OF_RANGE_H = "The length of input 'H' should be between 1 and 9990.",
  OUT_OF_RANGE_N = "The length of input 'N' should be between 1 and 999.",
}

type TPosition = [number, number];

class Queue<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  enqueue(element: T) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  getAll() {
    return this.items;
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  printQueue() {
    return this.items.join(" ");
  }
}

const isValid = (
  L: number,
  H: number,
  rows: string[],
  N: number,
  coordinates: string[]
) => {
  switch (true) {
    case L < 1 || L > 9909: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_L);
    }
    case H < 1 || H > 9909: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_H);
    }
    case N < 1 || N > 999: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case rows.length !== H ||
      !rows.reduce((valid, row) => {
        const validRow =
          row.length === L &&
          row
            .split("")
            .reduce(
              (valid, char) => valid && (char === "#" || char === "O"),
              true
            );

        return valid && validRow;
      }, true): {
      throw new Error(ErrorEnum.INVALID_ROWS);
    }
    case coordinates.length !== N ||
      !coordinates.reduce((valid, coordinate) => {
        const splitted = coordinate.split(" ");
        const x = parseInt(splitted[0]);
        const y = parseInt(splitted[1]);

        return valid && !isNaN(x) && !isNaN(y);
      }, true): {
      throw new Error(ErrorEnum.INVALID_COORDINATES);
    }
    default: {
      return true;
    }
  }
};

const checkNodeVisited = (position: TPosition, visited: TPosition[]) => {
  const [x, y] = position;

  const found = visited.find(
    (position) => position[0] === x && position[1] === y
  );

  return found ? true : false;
};

const filterPositionsByMark = (
  mark: "#" | "O",
  positions: TPosition[],
  rows: string[]
): TPosition[] =>
  positions.filter((position) => {
    const x = position[0];
    const y = position[1];

    return rows[y][x] ? rows[y][x] === mark : false;
  });

const findNeighbours = (
  source: TPosition,
  l: number,
  h: number,
  rows: string[]
) => {
  const [x, y] = source;

  let neighbours: TPosition[] = [];

  const mark = rows[y][x] as "#" | "O";

  if (l > 1) {
    if (!x)
      neighbours = [
        ...neighbours,
        ...filterPositionsByMark(mark, [[x + 1, y]], rows),
      ];
    else if (x === l - 1)
      neighbours = [
        ...neighbours,
        ...filterPositionsByMark(mark, [[x - 1, y]], rows),
      ];
    else
      neighbours = [
        ...neighbours,
        ...filterPositionsByMark(
          mark,
          [
            [x - 1, y],
            [x + 1, y],
          ],
          rows
        ),
      ];
  }

  if (h > 1) {
    if (!y)
      neighbours = [
        ...neighbours,
        ...filterPositionsByMark(mark, [[x, y + 1]], rows),
      ];
    else if (y === h - 1)
      neighbours = [
        ...neighbours,
        ...filterPositionsByMark(mark, [[x, y - 1]], rows),
      ];
    else
      neighbours = [
        ...neighbours,
        ...filterPositionsByMark(
          mark,
          [
            [x, y - 1],
            [x, y + 1],
          ],
          rows
        ),
      ];
  }

  return neighbours;
};

// all water 'definitely' connected when:
// - only one row has a maximum of 'l' minus one squares of land
const checkAllWaterDefinitelyConnected = (
  l: number,
  h: number,
  rows: string[]
) => {
  let allWaterDefinitelyConnected = false;
  let rowsWithLand = 0;
  let totalLandSquares = 0;

  for (let y = 0; y < h; y++) {
    const row = rows[y];

    let landSquares = 0;

    for (let x = 0; x < l; x++) {
      const mark = row[x];

      if (mark === "#") {
        landSquares += 1;
      }
    }

    if (landSquares) {
      totalLandSquares += landSquares;
      rowsWithLand += 1;
    }
  }

  if (rowsWithLand <= 1 && totalLandSquares < l)
    allWaterDefinitelyConnected = true;

  return { allWaterDefinitelyConnected, totalLandSquares };
};

const findSurfaceArea = (
  source: TPosition,
  l: number,
  h: number,
  rows: string[]
) => {
  const [x, y] = source;

  if (rows[y][x] === "#") return 0;

  const { allWaterDefinitelyConnected, totalLandSquares } =
    checkAllWaterDefinitelyConnected(l, h, rows);

  if (allWaterDefinitelyConnected) return l * h - totalLandSquares;

  let surfaceArea = 0;
  let visited: TPosition[] = [];

  const queue = new Queue<TPosition>();
  queue.enqueue(source);

  while (!queue.isEmpty()) {
    const dequeuedItem = queue.dequeue();

    if (dequeuedItem) {
      visited = [...visited, dequeuedItem];
      surfaceArea += 1;

      const neighbours = findNeighbours(dequeuedItem, l, h, rows);

      for (let i = 0; i < neighbours.length; i++) {
        const neighbour = neighbours[i];
        const nodeVisited = checkNodeVisited(neighbour, visited);

        const queuedItems = queue.getAll();
        const queued = queuedItems.find(
          (item) => item[0] === neighbour[0] && item[1] === neighbour[1]
        );

        if (!nodeVisited && !queued) {
          queue.enqueue(neighbour);
        }
      }
    }
  }

  return surfaceArea;
};

export const solution = (
  L: number,
  H: number,
  rows: string[],
  N: number,
  coordinates: string[]
) => {
  isValid(L, H, rows, N, coordinates);

  let surfaceAreas: number[] = [];
  for (let i = 0; i < coordinates.length; i++) {
    const splitted = coordinates[i].split(" ");
    const source: TPosition = [parseInt(splitted[0]), parseInt(splitted[1])];

    const surfaceArea = findSurfaceArea(source, L, H, rows);

    surfaceAreas = [...surfaceAreas, surfaceArea];
  }

  return surfaceAreas;
};
