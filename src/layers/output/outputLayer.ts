import DATA from '../../savedWeights/updatedWeights.json';
import { relu } from '~/functions/relu';
import { SIGMOID } from '~/functions/sigmoid';
import { softmax } from '~/functions/softmax';

export const outputLayer = (input: Array<number>) => {
  const possibleOutputs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const weights = DATA.outputLayerWeights;
  const biases = DATA.outputLayerBiases;
  const neurons = possibleOutputs.length;

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
    return sum + currentBias;
  });

  return softmax(activations);
};
