/*
    Logic Gates

    A logic gate is an electronic device implementing a boolean function, performing a logical operation on one or more binary inputs and producing a single binary output.

    Given n input signal names and their respective data, and m output signal names with their respective type of gate and two input signal names, 
    provide m output signal names and their respective data, in the same order as provided in input description.

    All type of gates will always have two inputs and one output.
    All input signal data always have the same length.

    The type of gates are :
    • AND : performs a logical AND operation.
    • OR : performs a logical OR operation.
    • XOR : performs a logical exclusive OR operation.
    • NAND : performs a logical inverted AND operation.
    • NOR : performs a logical inverted OR operation.
    • NXOR : performs a logical inverted exclusive OR operation.

    Signals are represented with underscore and minus characters, an undescore matching a low level (0, or false) and a minus matching a high level (1, or true).

    Input
        • n: the number of input signals.
        • m: the number of output signals.
        • inputSignals: an array of strings where each string represents the name of the input signal and the signal form (separated by a space).
        • operations: an array of strings where each string represents the name of the output signal, the type of logic gate, the first input name and the second input name (separated by a space).

    Output
    An array of strings where each string represents the name of the output signal and the signal form (separated by a space).

    Constraints:
        • 1 ≤ n ≤ 4
        • 1 ≤ m ≤ 16

    Example 1:
        Input: n = 2, m = 3, 
            inputSignals = [
                "A __---___---___---___---___",
                "B ____---___---___---___---_",
            ],
            operations = [
                "C AND A B",
                "D OR A B",
                "E XOR A B",
            ]
        Output: [
            "C ____-_____-_____-_____-___",
            "D __-----_-----_-----_-----_",
            "E __--_--_--_--_--_--_--_--_",
        ]

    source: codingame
*/

export enum ErrorEnum {
  INVALID_INPUT_SIGNALS = "The length of input 'inputSignals' should equal to the input 'n' and each signal should be a valid input signal.",
  INVALID_OPERATIONS = "The length of input 'operations' should equal to the input 'm' and each operation should be a valid operation.",
  OUT_OF_RANGE_N = "The value of input 'n' should be between 1 and 4.",
  OUT_OF_RANGE_M = "The value of input 'm' should be between 1 and 16.",
}

enum LogicGateEnum {
  AND = "AND",
  OR = "OR",
  XOR = "XOR",
  NAND = "NAND",
  NOR = "NOR",
  XNOR = "XNOR",
}

const isValid = (
  n: number,
  m: number,
  inputSignals: string[],
  operations: string[]
) => {
  switch (true) {
    case n < 1 || n > 4: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_N);
    }
    case m < 1 || m > 16: {
      throw new Error(ErrorEnum.OUT_OF_RANGE_M);
    }
    // ensure each signal inside 'inputSignals' is valid signal and following the constraint
    case inputSignals.length !== n ||
      !inputSignals.reduce((valid, signal) => {
        const splitted = signal.split(" ");

        if (splitted.length !== 2) return valid && false;

        const [_, form] = splitted;

        for (let i = 0; i < form.length; i++) {
          if (form[i] !== "_" && form[i] !== "-") return valid && false;
        }

        return valid && true;
      }, true) ||
      !inputSignals.reduce(
        (valid, signal) => valid && signal.length === inputSignals[0].length,
        true
      ): {
      throw new Error(ErrorEnum.INVALID_INPUT_SIGNALS);
    }
    // ensure each operation inside 'operations' is valid and following the constraint
    case operations.length !== m ||
      !operations.reduce((valid, operation) => {
        const splitted = operation.split(" ");

        if (splitted.length !== 4) return valid && false;

        const [_, gate, a, b] = splitted;

        if (!Object.keys(LogicGateEnum).includes(gate)) return valid && false;

        const inputNames = inputSignals.map((signal) => signal.split(" ")[0]);

        if (!inputNames.includes(a) || !inputNames.includes(b))
          return valid && false;

        return valid && true;
      }, true): {
      throw new Error(ErrorEnum.INVALID_OPERATIONS);
    }
    default: {
      return true;
    }
  }
};

const logicOperation = (gate: LogicGateEnum, a: boolean, b: boolean) => {
  switch (gate) {
    case LogicGateEnum.AND: {
      return a && b;
    }
    case LogicGateEnum.OR: {
      return a || b;
    }
    case LogicGateEnum.NAND: {
      return !(a && b);
    }
    case LogicGateEnum.NOR: {
      return !(a || b);
    }
    case LogicGateEnum.XOR: {
      return a ? !b : b;
    }
    // LogicGateEnum.XNOR
    default: {
      return !(a ? !b : b);
    }
  }
};

export const solution = (
  n: number,
  m: number,
  inputSignals: string[],
  operations: string[]
) => {
  isValid(n, m, inputSignals, operations);

  const inSignals = new Map<string, string>();
  inputSignals.forEach((signal) => {
    const [name, form] = signal.split(" ");

    inSignals.set(name, form);
  });

  const outSignals = new Map<string, string>();
  operations.forEach((operation) => {
    const [name, gate, input1, input2] = operation.split(" ");

    const a = inSignals.get(input1)!;
    const b = inSignals.get(input2)!;

    let form = "";
    for (let i = 0; i < a.length; i++) {
      const result = logicOperation(
        gate as LogicGateEnum,
        a[i] === "-",
        b[i] === "-"
      );

      form = form.concat(result ? "-" : "_");
    }

    outSignals.set(name, form);
  });

  let result: string[] = [];
  for (let entry of outSignals.entries()) {
    result = [...result, `${entry[0]} ${entry[1]}`];
  }

  return result;
};
