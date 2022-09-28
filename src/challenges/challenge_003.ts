/*
    ASCII Forest

    There was a snowstorm outside, and elf Peter finally returned. Outside is Ascii Forest and Elf Peter saw it. 
    He said only two numbers before falling asleep from fatigue: the number of trees in Ascii Forest that Peter saw, and the height of those trees. 
    What does Ascii Forest look like which elf Peter saw?

    A tree is a triangle made of / and \. All other places are filled with snow . like this:
    .../\...
    ../..\..
    ./....\.
    /......\

    Trees are in a horizontal row.

    Input
    Two integers n and h that elf Peter said before he fall asleep.
      • n is number of trees in Ascii Forest that Peter saw.
      • h is height of trees in that forest.
    
    Output
    h lines how the Ascii Forest looks like which elf Peter saw.

    Constraints:
      • 1 <= n <= 10
      • 2 <= h <= 50

    Example 1:
      Input: n = 1, h = 5
      Output: 
            ..../\....
            .../..\...
            ../....\..
            ./......\.
            /........\
    
    Example 2:
      Input: Input: n = 2, h = 5
      Output: 
            ..../\......../\....
            .../..\....../..\...
            ../....\..../....\..
            ./......\../......\.
            /........\/........\
    
    source: codingame
*/

export enum ErrorEnum {
  OUT_OF_RANGE_H = "The value of input 'h' should be between 2 and 50.",
  OUT_OF_RANGE_N = "The value of input 'n' should be between 1 and 10.",
}

const isValid = (h: number, n: number) => {
  switch (true) {
    case h < 2 || h > 50: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_H);
    }
    case n < 1 || n > 10: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    default: {
      return true;
    }
  }
};

const treePart = (
  treeHeight: number,
  partOrder: number,
  firstHalf: boolean
): string[] => {
  const basePart: string[] = Array(treeHeight).fill(".");
  const part = basePart.map((p, i) => {
    if (firstHalf) {
      if (i === treeHeight - partOrder - 1) return "/";

      return p;
    }

    if (i === partOrder) return "\\";

    return p;
  });

  return part;
};

export const solution = (h: number, n: number) => {
  isValid(h, n);

  let asciiForest: string[] = [];

  for (let i = 0; i < h; i++) {
    let parts: string[] = [];

    for (let j = 0; j < n; j++) {
      parts = [...parts, ...treePart(h, i, true), ...treePart(h, i, false)];
    }

    asciiForest = [...asciiForest, parts.join("")];
  }

  return asciiForest;
};
