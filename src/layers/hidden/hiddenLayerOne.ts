import DATA from '../../savedWeights/updatedWeights.json';
import { relu } from '~/functions/relu';

export const hiddenLayerOne = (input: Array<number>) => {
  const weights = DATA.hiddenLayer1Weights;
  const biases = DATA.hiddenLayer1Biases;
  const neurons = 16;

  if (weights[0]?.length !== input.length) {
    throw new Error(
      `Weights and input are not the same length! Weights: ${weights[0]?.length}, Input: ${input.length}`
    );
  }

  if (neurons !== biases.length) {
    throw new Error(
      `Neurons and biases are not the same length! Neurons: ${neurons}, Biases: ${biases.length}`
    );
  }

  const weightedSum = weights.map((row) =>
    row.reduce((acc, curr, index) => {
      const currentInput = input[index];
      if (currentInput === undefined) {
        throw new Error(
          `Input value is undefined! Input: ${input}, Index: ${index}`
        );
      }
      return acc + curr * currentInput;
    }, 0)
  );

  const activations = weightedSum.map((sum, index) => {
    const currentBias = biases[index];
    if (currentBias === undefined) {
      throw new Error(
        `Bias value is undefined! Biases: ${biases}, Index: ${index}`
      );
    }
    return relu(sum + currentBias);
  });

  console.log('Hidden Layer One Activations: ', activations);
  return activations;
};
