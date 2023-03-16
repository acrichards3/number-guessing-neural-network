import { inputLayer } from './input/inputLayer';
import { backPropagation } from '~/backProp/functions/backPropagation';
import { hiddenLayerOne } from './hidden/hiddenLayerOne';
import { hiddenLayerTwo } from './hidden/hiddenLayerTwo';
import { outputLayer } from './output/outputLayer';
import { api } from '~/utils/api';
import DATA from '../savedWeights/updatedWeights.json';

interface WeightsAndBiases {
  hiddenLayer1Weights: number[][];
  hiddenLayer1Biases: number[];
  hiddenLayer2Weights: number[][];
  hiddenLayer2Biases: number[];
  outputLayerWeights: number[][];
  outputLayerBiases: number[];
}

export const runPrediction = (
  input: Array<Array<number>> | undefined,
  desiredOutput?: number[] | undefined
) => {
  if (!input) return undefined;

  const inputLayerOutput = inputLayer(input);
  const hiddenLayerOneOutput = hiddenLayerOne(inputLayerOutput);
  const hiddenLayerTwoOutput = hiddenLayerTwo(hiddenLayerOneOutput);
  const outputLayerOutput = outputLayer(hiddenLayerTwoOutput);

  if (desiredOutput !== undefined) {
    const learningRate = 0.1;
    const generations = 100;
    // Update the INPUT JSON to be used for future training
    let weightsAndBiases: WeightsAndBiases = {
      hiddenLayer1Weights: DATA.hiddenLayer1Weights,
      hiddenLayer1Biases: DATA.hiddenLayer1Biases,
      hiddenLayer2Weights: DATA.hiddenLayer2Weights,
      hiddenLayer2Biases: DATA.hiddenLayer2Biases,
      outputLayerWeights: DATA.outputLayerWeights,
      outputLayerBiases: DATA.outputLayerBiases,
    };
    //console.log('weightsAndBiases', weightsAndBiases);
    for (let i = 0; i < generations; i++) {
      const newValues = backPropagation(
        input,
        weightsAndBiases,
        desiredOutput,
        learningRate
      );
      weightsAndBiases = newValues;
      if (i === generations - 1) {
        // Update the weights + biases JSON
        const returnNewValues = backPropagation(
          input,
          weightsAndBiases,
          desiredOutput,
          learningRate
        );
        weightsAndBiases = returnNewValues; // FINAL DATA
        //console.log('DONE!', weightsAndBiases);
        console.log(JSON.stringify(weightsAndBiases));
      }
    }
  }

  return outputLayerOutput;
};
