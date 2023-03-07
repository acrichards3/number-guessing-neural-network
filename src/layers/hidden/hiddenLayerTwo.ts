import DATA from '../../savedWeights/updatedWeights.json';
import { SIGMOID } from '~/functions/sigmoid';
import { relu } from '~/functions/relu';

const SIZE = 16;

export const hiddenLayerTwo = (input: Array<number>) => {
  const activationInputs: Array<number> = [];
  const inputSum = input.reduce((sum, curr) => sum + curr, 0);
  const weightedSumArr: Array<number> = [];
  const weights = DATA.hiddenLayer2Weights;
  const biases = DATA.hiddenLayer2Biases;

  if (weights.length !== biases.length) {
    throw new Error(
      'WHAT IS THAT PRIVATE PYLE?. If you are seeing this, you resign now because weights and biases are not the same length'
    );
  }

  for (let i = 0; i < SIZE; i++) {
    const weightedSum = (weights[i] ?? []).reduce((acc, curr) => acc + curr, 0);
    if (weightedSum !== undefined) {
      weightedSumArr.push(weightedSum);
    }
  }

  for (let i = 0; i < weightedSumArr.length; i++) {
    const activationInput =
      inputSum * (weightedSumArr[i] ?? 0) + (biases[i] ?? 0);
    activationInputs.push(activationInput);
  }

  return activationInputs.map((input) => relu(input));
};
