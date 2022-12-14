/*
    Table of Contents

    You are writing a book, and the table of contents is the only thing left to do. 
    Sadly, the necessary packages are not working well, so you will have to implement one yourself.

    To generate the table of contents, your program will read N entries, describing a section with its level, title and page.
    • The level is given by the number of > at the start of the entry.
    • The title will not contain any space nor > characters.
    • The page is an integer, separated from the title by a space.

    Your program will then output the table of contents with the right format, N lines containing :
    • An indentation to reflect the level, 4 spaces per level.
    • The number of the section
    • Its title
    • A variable number of dots, for each line to be lengthofline long (including the page number)
    • The page number

    Input
        • lengthOfLine: an integer that represents the length of a line in the formatted result.
        • N: an integer that represents the number of entries.
        • entries: an array of string where each string represents an entry in bad format.

    Output
    An array of N strings where each string represents the entry in good format.

    Constraints:
    • 1 ≤ N ≤ 30
    • 30 ≤ lengthOfLine ≤ 50

    Example 1:
        Input: 
            lengthOfLine = 40, 
            N = 5, 
            entries = [
                "Title1 4",
                ">Subtitle1 5",
                ">>Subsubtitle1 5",
                ">Subtitle2 6", 
                "Title2 10",
            ]
        Output: [
            "1 Title1...............................4",
            "    1 Subtitle1........................5",
            "        1 Subsubtitle1.................5",
            "    2 Subtitle2........................6",
            "2 Title2..............................10",
        ]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_ENTRIES = "The length of input 'entries' should be equal to input 'N'",
  OUT_OF_RANGE_LENGTH_OF_LINE = "The value of input 'lengthOfLine' should be between 30 and 50.",
  OUT_OF_RANGE_N = "The value of input 'N' should be between 1 and 30.",
}

interface IContent {
  level: number;
  pageNumber: string;
  title: string;
  sectionNumber: number;
}

const isValid = (lengthOfLine: number, N: number, entries: string[]) => {
  switch (true) {
    case lengthOfLine < 30 || lengthOfLine > 50: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_LENGTH_OF_LINE);
    }
    case N < 1 || N > 30: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case entries.length !== N: {
      throw new Error(ErrorEnum.INVALID_ENTRIES);
    }
    default: {
      return true;
    }
  }
};

export const solution = (
  lengthOfLine: number,
  N: number,
  entries: string[]
) => {
  isValid(lengthOfLine, N, entries);

  const contents = entries.reduce((contents, entry, i) => {
    const splitted = entry.split(" ");

    const pageNumber = splitted[1];
    const title = splitted[0].replace(/>/g, "");

    let level = 0;
    if (splitted[0].includes(">")) {
      for (let i = 0; i < splitted[0].length; i++) {
        if (splitted[0][i] !== ">") break;

        level += 1;
      }
    }

    let sectionNumber = 1;

    if (i) {
      const lastContent = contents[contents.length - 1];

      if (lastContent.level === level) {
        sectionNumber = lastContent.sectionNumber + 1;
      } else if (lastContent.level > level) {
        const filtered = contents.filter((content) => content.level === level);

        if (filtered.length)
          sectionNumber = filtered[filtered.length - 1].sectionNumber + 1;
      }
    }

    return [...contents, { level, pageNumber, title, sectionNumber }];
  }, [] as IContent[]);

  const goodFormattedContents = contents.map((content) => {
    const { level, pageNumber, title, sectionNumber } = content;

    const rightSide = pageNumber;
    const leftSide = `${new Array(level)
      .fill("    ")
      .join("")}${sectionNumber.toString()} ${title}`.padEnd(
      lengthOfLine - rightSide.length,
      "."
    );

    return leftSide + rightSide;
  });

  return goodFormattedContents;
};
