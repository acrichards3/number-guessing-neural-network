export const softmax = (input: Array<number>): Array<number> => {
  const max = Math.max(...input);
  const result = input.map((number) => {
    return Math.exp(number - max);
  });
  const sum = result.reduce((acc, curr) => acc + curr);
  return result.map((number) => number / sum);
};
