import DATA from '../../savedWeights/updatedWeights.json';
import { SIGMOID } from '~/functions/sigmoid';
import { relu } from '~/functions/relu';

const SIZE = 16;

export const hiddenLayerOne = (input: Array<number>) => {
  const activationInputs: Array<number> = [];
  const weightedSumArr: Array<number> = [];
  const inputSum = input.reduce((sum, curr) => sum + curr, 0);
  const weights = DATA.hiddenLayer1Weights;
  const biases = DATA.hiddenLayer1Biases;

  if (weights.length !== SIZE || biases.length !== SIZE) {
    throw new Error(
      'Weights and biases are not the same length. If you are seeing this, something went terribly wrong and it might be time to give up on life as you know it'
    );
  }

  for (let i = 0; i < biases.length; i++) {
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
