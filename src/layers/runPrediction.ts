import { inputLayer } from './input/inputLayer';
import { MSE } from '~/backProp/functions/MSE';
import { backPropagation } from '~/backProp/functions/backPropagation';
import { hiddenLayerOne } from './hidden/hiddenLayerOne';
import { hiddenLayerTwo } from './hidden/hiddenLayerTwo';
import { outputLayer } from './output/outputLayer';

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
    const generations = 10;
    // Update the INPUT JSON to be used for future training
    for (let i = 0; i < generations; i++) {
      console.log('ran!');
      //console.log(MSE(outputLayerOutput, desiredOutput);, `Error at generation ${i}`);
      backPropagation(
        inputLayerOutput,
        hiddenLayerOneOutput,
        hiddenLayerTwoOutput,
        outputLayerOutput,
        desiredOutput,
        learningRate
      );
      if (i === generations - 1) {
        // Update the weights + biases JSON
        console.log('done');
      }
    }
  }

  return outputLayerOutput;
};
