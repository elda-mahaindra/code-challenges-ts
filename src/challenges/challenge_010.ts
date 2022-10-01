/*
    Fire Control

    You need to cut down some trees in a forest fire to stop the fire from spreading. 
    Write code to help you determine the least amount of trees to cut to contain the fire.

    The size of the forest is a 6 by 6 grid.
    Fire can spread sideways as well as diagonally.
    To stop the fire, you need to remove two layers of trees.

    # Tree
    = Cut-down tree
    o Empty space
    * Fire

    If there are no trees that can be saved by blocking the fire, output: 'JUST RUN'.
    if there is no fire, output: 'RELAX'.

    Input
        • forest: an array of strings which represents the 6 x 6 grid forest.

    Output
    The number of trees to be cut or 'JUST RUN' or 'RELAX'

    Constraints:
        • forest length === 6
        • forest width === 6

    Example 1:
        Input: 
            forest = [
                "*#####",
                "######".
                "######",
                "######",
                "######",
                "######",
            ]
        To be cut: 
            forest = [
                "*12###",
                "345###".
                "678###",
                "######",
                "######",
                "######",
            ]
        Output: 8

    Example 2:
        Input: 
            forest = [
                "######",
                "######".
                "######",
                "######",
                "======",
                "******",
            ]
        To be cut: 
            forest = [
                "######",
                "######".
                "######",
                "123456",
                "======",
                "******",
            ]
        Output: 6

    source: codingame
*/

export enum ErrorEnum {
  INVALID_FOREST = "The value of input 'forest' should be an array of strings which represents the 6 x 6 grid forest an contain either '#', '=', 'o', or '*'.",
}

const isValid = (forest: string[]) => {
  switch (true) {
    case forest.length !== 6 ||
      !forest.reduce((valid, forestLine) => {
        const splitted = forestLine.split("");

        const validContent = splitted.reduce(
          (validContent, content) =>
            validContent &&
            (content === "#" ||
              content === "=" ||
              content === "o" ||
              content === "*"),
          true
        );

        return valid && forestLine.length === 6 && validContent;
      }, true): {
      throw new Error(ErrorEnum.INVALID_FOREST);
    }
    default: {
      return true;
    }
  }
};

export const solution = (forest: string[]) => {
  isValid(forest);

  let removedTress = 0;
  let firePoints: { x: number; y: number }[] = [];

  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 6; i++) {
      if (forest[j][i] === "*") firePoints = [...firePoints, { x: i, y: j }];
    }
  }

  if (!firePoints.length) return "RELAX";

  let resultForest: string[] = [];

  for (let j = 0; j < 6; j++) {
    let resultSquares = forest[j].split("");

    for (let i = 0; i < 6; i++) {
      if (forest[j][i] === "#") {
        const fires = firePoints.filter((point) => {
          const { x, y } = point;

          return (
            (i === x - 2 ||
              i === x - 1 ||
              i === x ||
              i === x + 1 ||
              i === x + 2) &&
            (j === y - 2 ||
              j === y - 1 ||
              j === y ||
              j === y + 1 ||
              j === y + 2)
          );
        });

        if (fires.length) {
          resultSquares[i] = "=";
          removedTress += 1;
        }
      }
    }

    const resultLine = resultSquares.join("");

    resultForest = [...resultForest, resultLine];
  }

  const anyTreesRemain = resultForest.reduce(
    (anyTreesRemain, line) => anyTreesRemain || line.includes("#"),
    false
  );

  return anyTreesRemain ? removedTress : "JUST RUN";
};
