export const softmax = (logits: Array<number>): Array<number> => {
  const maxLogit = Math.max(...logits);
  const exp = logits.map((val) => Math.exp(val - maxLogit));
  const sumExp = exp.reduce((acc, curr) => acc + curr);
  return exp.map((val) => val / sumExp);
};
