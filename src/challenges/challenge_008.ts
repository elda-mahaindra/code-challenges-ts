/*
    Rock Paper Scissors Lizard Spock

    An international Rock Paper Scissors Lizard Spock tournament is organized, all players receive a number when they register.

    Each player chooses a sign that he will keep throughout the tournament among:
    • Rock (R)
    • Paper (P)
    • sCissors (C)
    • Lizard (L)
    • Spock (S)

    Rules
    • Scissors cuts Paper
    • Paper covers Rock
    • Rock crushes Lizard
    • Lizard poisons Spock
    • Spock smashes Scissors
    • Scissors decapitates Lizard
    • Lizard eats Paper
    • Paper disproves Spock
    • Spock vaporizes Rock
    • Rock crushes Scissors
    • and in case of a tie, the player with the lowest number wins (it's scandalous but it's the rule).

    Illustration
    4 R \
        1 P \
    1 P /      \
                1 P
    8 P \      /     \
        8 P /       \
    3 R /              \
                        2 L
    7 C \              /
        5 S \       /
    5 S /      \     /
                2 L
    6 L \      /
        2 L /
    2 L /
    The winner of the tournament is player 2. Before winning, he faced player 6, then player 5 and finally player 1.

    Input
        • N: represents the number of participants in the competition.
        • playerSigns: an array of strings and each string represents the unique player number concatenated by a letter 'R', 'P', 'C', 'L' or 'S' indicating the chosen sign separated by a space.

    Output
    A string represents the player number of the winner concatenated by a space and the list of its opponents separated by spaces.

    Constraints:
        • N is a 2^k value (2, 4, 8, 16, ..., 1024)
        • 2 ≤ N ≤ 1024

    Example 1:
        Input: N = 8, playerSigns = ["4 R", "1 P", "8 P", "3 R", "7 C", "5 S", "6 L", "2 L"]
        Output: "2 6 5 1"

    source: codingame
*/

export enum ErrorEnum {
  INVALID_N = "The value of input 'N' should be a a 2^k value (2, 4, 8, 16, ...).",
  INVALID_PLAYER_SIGNS = "The value of input 'playerSigns' should be an array of strings and each string represents the unique player number concatenated by a letter 'R', 'P', 'C', 'L' or 'S' indicating the chosen sign separated by a space.",
  OUT_OF_RANGE_N = "The value of input 'N' should be between 2 and 1024.",
}

type Sign = "R" | "P" | "C" | "L" | "S";

interface ISignOption {
  sign: Sign;
  winningTo: [Sign, Sign];
  losingTo: [Sign, Sign];
}

interface IPlayer {
  playerNumber: number;
  signOption: ISignOption;
  winRecords: number[];
}

const signOptions: ISignOption[] = [
  { sign: "R", winningTo: ["L", "C"], losingTo: ["P", "S"] },
  { sign: "P", winningTo: ["R", "S"], losingTo: ["C", "L"] },
  { sign: "C", winningTo: ["P", "L"], losingTo: ["R", "S"] },
  { sign: "L", winningTo: ["S", "P"], losingTo: ["R", "C"] },
  { sign: "S", winningTo: ["R", "C"], losingTo: ["P", "L"] },
];

const isValid = (N: number, playerSigns: string[]) => {
  const validateN = (N: number) => {
    let checking = true;
    let n = N;

    while (checking) {
      if (n % 2 !== 0 || n < 2) {
        checking = false;
      } else {
        n = n / 2;
      }
    }

    return n === 1;
  };

  const validatePlayerSigns = (playerSigns: string[]) => {
    if (playerSigns.length !== N) return false;

    const sorted = [...playerSigns].sort((a, b) => (a > b ? 1 : -1));

    for (let i = 0; i < sorted.length; i++) {
      const currentSplitted = sorted[i].split(" ");
      const currentNumber = parseInt(currentSplitted[0]);
      const currentSign = currentSplitted[1];

      if (
        isNaN(currentNumber) ||
        currentNumber <= 0 ||
        !"RPCLS".includes(currentSign)
      )
        return false;

      if (i) {
        const previousSplitted = sorted[i - 1].split(" ");
        const previousNumber = parseInt(previousSplitted[0]);

        if (previousNumber === currentNumber) return false;
      }
    }

    return true;
  };

  switch (true) {
    case N < 2 || N > 1024: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case !validateN(N): {
      throw new Error(ErrorEnum.INVALID_N);
    }
    // ensure each Pi inside powers following the constraint
    case !validatePlayerSigns(playerSigns): {
      throw new Error(ErrorEnum.INVALID_PLAYER_SIGNS);
    }
    default: {
      return true;
    }
  }
};

export const solution = (N: number, playerSigns: string[]) => {
  isValid(N, playerSigns);

  let players: IPlayer[] = playerSigns.map((playerSign) => {
    const splitted = playerSign.split(" ");
    const playerNumber = parseInt(splitted[0]);
    const sign = splitted[1];

    return {
      playerNumber,
      signOption: signOptions.find((s) => s.sign === sign)!,
      winRecords: [],
    };
  });

  while (players.length > 1) {
    let winners: IPlayer[] = [];

    for (let i = 0; i < players.length; i += 2) {
      const playerOne = players[i];
      const { playerNumber: playerOneNumber, signOption: playerOneSignOption } =
        playerOne;
      const { losingTo: playerOneLosingTo, winningTo: playerOneWinningTo } =
        playerOneSignOption;

      const playerTwo = players[i + 1];
      const { playerNumber: playerTwoNumber, signOption: playerTwoSignOption } =
        playerTwo;
      const { sign: playerTwoSign } = playerTwoSignOption;

      const playerOneLosing = playerOneLosingTo.includes(playerTwoSign);
      const playerOneWinning = playerOneWinningTo.includes(playerTwoSign);

      if (playerOneLosing)
        winners = [
          ...winners,
          {
            ...playerTwo,
            winRecords: [...playerTwo.winRecords, playerOneNumber],
          },
        ];
      else if (playerOneWinning)
        winners = [
          ...winners,
          {
            ...playerOne,
            winRecords: [...playerOne.winRecords, playerTwoNumber],
          },
        ];
      else if (playerOneNumber > playerTwoNumber)
        winners = [
          ...winners,
          {
            ...playerTwo,
            winRecords: [...playerTwo.winRecords, playerOneNumber],
          },
        ];
      else
        winners = [
          ...winners,
          {
            ...playerOne,
            winRecords: [...playerOne.winRecords, playerTwoNumber],
          },
        ];
    }

    players = [...winners];
  }

  const winner = players[0];
  const { playerNumber, winRecords } = winner;

  return [playerNumber, ...winRecords].join(" ");
};
