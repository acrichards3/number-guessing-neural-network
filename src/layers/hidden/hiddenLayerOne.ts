import { inputLayer } from '../input/inputLayer';
import { SIGMOID } from '~/functions/sigmoid';
import DATA from '../../savedWeights/updatedWeights.json';
import { relu } from '~/functions/relu';

const SIZE = 16;

export const hiddenLayerOne = (input: Array<number>) => {
  if (!DATA) return;
  if (!input) return;

  const activationInputs: Array<number> = [];
  const weightedSumArr: Array<number> = [];
  const inputSum = input.reduce((acc, curr) => acc + curr, 0);
  const weights = DATA.hiddenLayer1Weights;
  const biases = DATA.hiddenLayer1Biases;

  if (weights.length !== SIZE || biases.length !== SIZE) {
    throw new Error(
      'Weights and biases are not the same length. If you are seeing this, something went terribly wrong and it might be time to give up on life as you know it'
    );
  }

  console.log(inputSum, 'SUM');

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

  console.log(activationInputs, 'TOTAL WEIGHTS');

  const output = activationInputs.map((input) => relu(input));

  console.log(output, 'OUTPUT');
  return output;
};
