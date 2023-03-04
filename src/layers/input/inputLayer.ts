export const inputLayer = (grid: number[][] | undefined) => {
  if (!grid) return;

  const input = grid.flat();
  return input;
};
