/*
    Retro Typewriter Art

    Back in the day, people had fun turning "recipes" into surprise images using typewriters.

    Use the provided recipe to create a recognizable image.

    Chunks in the recipe are separated by a space.
    Each chunk will tell you either
    nl meaning NewLine (aka Carriage Return)
    ~or~
    how many of the character and what character

    For example:
        4z means zzzz
        1{ means {
        10= means ==========
        5bS means \\\\\ (see Abbreviations list below)
        27 means 77
        123 means 333333333333
        (If a chunk is composed only of numbers, the character is the last digit.)

        So if part of the recipe is
        2* 15sp 1x 4sQ nl
        ...that tells you to show
        **               x''''
        and then go to a new line.
    
    Abbreviations used:
        sp = space
        bS = backSlash \
        sQ = singleQuote '
        and
        nl = NewLine

    Sources/references:
        https://asciiart.cc
        https://loriemerson.net/2013/01/18/d-i-y-typewriter-art/
        https://www.youtube.com/watch?v=kyK5WvpFxqo

    Input
        • recipe: a string represents the recipe.

    Output
    An array of strings showing the image created by the recipe.

    Constraints:
    • 5 ≤ length of recipe ≤ 1000
    • There won't be any double quotes (") in the recipe
    • recipe will contain at least 1 nl

    Example 1:
        Input: recipe = "1sp 1/ 1bS 1_ 1/ 1bS nl 1( 1sp 1o 1. 1o 1sp 1) nl 1sp 1> 1sp 1^ 1sp 1< nl 2sp 3|"
        Output: [
             " /\_/\",
             "( o.o )",
             " > ^ <",
             "  |||",
        ]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_RECIPE = "The input 'recipe' should not have any double quotes but have at least one 'nl'.",
  OUT_OF_RANGE_RECIPE = "The length of input 'recipe' should be between 5 and 1000.",
}

const isValid = (recipe: string) => {
  switch (true) {
    case recipe.length < 5 || recipe.length > 1000: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_RECIPE);
    }
    case recipe.includes('"') || !recipe.includes("nl"): {
      throw new Error(ErrorEnum.INVALID_RECIPE);
    }
    default: {
      return true;
    }
  }
};

const translateChunk = (chunk: string) => {
  if (chunk === "nl") return "nl";

  if (/^[\d]+$/.test(chunk)) {
    const splitted = chunk.split("");

    const char = splitted.splice(splitted.length - 1, 1);
    const times = parseInt(splitted.join(""));

    return new Array(times).fill(char).join("");
  }

  if (chunk.includes("sp")) {
    const times = parseInt(chunk.slice(0, chunk.indexOf("sp")));

    return new Array(times).fill(" ").join("");
  } else if (chunk.includes("bS")) {
    const times = parseInt(chunk.slice(0, chunk.indexOf("bS")));

    return new Array(times).fill("\\").join("");
  } else if (chunk.includes("sQ")) {
    const times = parseInt(chunk.slice(0, chunk.indexOf("sQ")));

    return new Array(times).fill("'").join("");
  }

  const times = parseInt(chunk.slice(0, chunk.length - 1));

  return new Array(times).fill(chunk[chunk.length - 1]).join("");
};

export const solution = (recipe: string) => {
  isValid(recipe);

  const chunks = recipe.split(" ");

  const result = chunks.reduce(
    (result, chunk, i) => {
      const translated = translateChunk(chunk);

      if (translated !== "nl") {
        const mapped = result.map((line, i): string => {
          if (i === result.length - 1) {
            return line.concat(translated);
          }

          return line;
        });

        return mapped;
      }

      return [...result, ""];
    },
    [""] as string[]
  );

  return result;
};
