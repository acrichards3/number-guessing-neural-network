import DATA from '../../savedWeights/updatedWeights.json';
import { relu } from '~/functions/relu';
import { softmax } from '~/functions/softmax';

const possibleOutputs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, NaN];

export const outputLayer = (input: Array<number>) => {
  const activationInputs: Array<number> = [];
  const inputSum = input.reduce((sum, curr) => sum + curr, 0);
  const weightedSumArr: Array<number> = [];
  const weights = DATA.outputLayerWeights;
  const biases = DATA.outputLayerBiases;

  if (weights.length !== biases.length) {
    throw new Error(
      'WHAT IS THAT PRIVATE PYLE?. If you are seeing this, you resign now because weights and biases are not the same length'
    );
  }

  for (let i = 0; i < possibleOutputs.length; i++) {
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

  const reluOutput = activationInputs.map((input) => relu(input));
  const softmaxOutput = softmax(reluOutput);

  console.log(softmaxOutput);
  const makePrediction = () => {
    const prediction = softmaxOutput.indexOf(Math.max(...softmaxOutput));
    if (possibleOutputs[prediction] === undefined) {
      throw new Error(
        'Fix this terrible code, you idiot. The prediction index doesnt exist within the possibleOutputs array.'
      );
    }
    return possibleOutputs[prediction];
  };

  return makePrediction();
};
