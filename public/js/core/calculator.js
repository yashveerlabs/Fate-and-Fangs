import { letterMap } from "./mappings.js";
import { reduceToSingleDigit } from "./reducer.js";

export function calculateValue(input) {
  let total = 0;

  input = input.toUpperCase().replace(/\s+/g, '');

  for (let char of input) {
    if (!isNaN(char)) {
      total += Number(char);
    } else if (letterMap[char]) {
      total += letterMap[char];
    }
  }

  const reduced = reduceToSingleDigit(total);

  return {
    total,
    reduced
  };
}
