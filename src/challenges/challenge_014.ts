/*
    Scrabble

    When playing Scrabble©, each player draws 7 letters and must find a word that scores the most points using these letters.

    A player doesn't necessarily have to make a 7-letter word; the word can be shorter. 
    The only constraint is that the word must be made using the 7 letters which the player has drawn.

    For example, with the letters  etaenhs, some possible words are: ethane, hates, sane, ant.

    Your objective is to find the word that scores the most points using the available letters (1 to 7 letters).

    Rules
    In Scrabble©, each letter is weighted with a score depending on how difficult it is to place that letter in a word. 
    You will see below a list showing the letters corresponding to each point:
 
     1 : e, a, i, o, n, r, t, l, s, u
     2 : d, g
     3 : b, c, m, p
     4 : f, h, v, w, y
     5 : k
     8 : j, x
    10 : q, z

    The word banjo earns you 3 + 1 + 1 + 8 + 1 = 14 points.

    A dictionary of authorized words is provided as input for the program. 
    The program must find the word in the dictionary which wins the most points for the seven given letters (a letter can only be used once). 
    If two words win the same number of points, then the word which appears first in the order of the given dictionary should be chosen.
    
    All words will only be composed of alphabetical characters in lower case. There will always be at least one possible word.

    Input
        • N: the number of words in dictionary.
        • dictionary: an array of string which represents a dictionary, where each string represents a word in dictionary.
        • letters: the 7 letters available for the current game.
    
    Output
    The word that scores the most points using the available letters (1 to 7 letters). The word must belong to the dictionary. 
    Each letter must be used at most once in the solution. There is always a solution.

    Constraints:
        • 0 < N < 100000
        • Words in the dictionary have a maximum length of 30 characters.

    Example 1:
      Input: N = 5, dictionary = ["because", "first", "these", "could", "which"], letters = "hicquwh"
      ]
      Output: "which"
    
    source: codingame
*/

export enum ErrorEnum {
  INVALID_DICTIONARY = "The length of input 'dictionary' should equal to the input 'N'.",
  OUT_OF_RANGE_LETTERS = "The length of input 'letters' should equal to 7.",
  OUT_OF_RANGE_N = "The value of input 'N' should be between 1 and 99999.",
  OUT_OF_RANGE_WORD = "Each string inside the input 'dictionary' should have maximum of 30 characters length.",
}

const scrabbleScores = [
  { score: 1, letters: "eaionrtlsu" },
  { score: 2, letters: "dg" },
  { score: 3, letters: "bcmp" },
  { score: 4, letters: "fhvwy" },
  { score: 5, letters: "k" },
  { score: 8, letters: "jx" },
  { score: 10, letters: "qz" },
];

const isValid = (N: number, dictionary: string[], letters: string) => {
  switch (true) {
    case N < 1 || N > 99999: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case letters.length !== 7: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_LETTERS);
    }
    case dictionary.length !== N: {
      throw new Error(ErrorEnum.INVALID_DICTIONARY);
    }
    case !dictionary.reduce(
      (valid, word) => valid && word.length <= 30,
      true
    ): {
      throw new Error(ErrorEnum.OUT_OF_RANGE_WORD);
    }
    default: {
      return true;
    }
  }
};

const calculateScore = (
  letters: string,
  word: string,
  scrabbleScores: { score: number; letters: string }[]
) => {
  if (word.length > letters.length) return 0;

  let remainingLetters = letters.split("");
  let matchingChars = "";
  let totalPoint = 0;

  for (let i = 0; i < word.length; i++) {
    const indexFound = remainingLetters.indexOf(word[i]);

    if (indexFound >= 0) {
      const point = scrabbleScores.find((p) =>
        p.letters.includes(word[i])
      )!.score;

      totalPoint += point;
      remainingLetters.splice(indexFound, 1);
      matchingChars = matchingChars.concat(word[i]);
    }
  }

  if (matchingChars === word) return totalPoint;

  return 0;
};

export const solution = (N: number, dictionary: string[], letters: string) => {
  isValid(N, dictionary, letters);

  let highestPointHolder = { word: "", point: 0 };
  for (let i = 0; i < dictionary.length; i++) {
    const point = calculateScore(letters, dictionary[i], scrabbleScores);

    if (point > highestPointHolder.point)
      highestPointHolder = { word: dictionary[i], point };
  }

  return highestPointHolder.word;
};
