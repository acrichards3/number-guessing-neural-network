export const softmax = (logits: Array<number>): Array<number> => {
  const maxLogit = Math.max(...logits);
  const exps = logits.map((x) => Math.exp(x - maxLogit));
  const sumExps = exps.reduce((sum, curr) => sum + curr);
  return exps.map((x) => x / sumExps);
};
