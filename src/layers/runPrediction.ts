import { inputLayer } from './input/inputLayer';
import { hiddenLayerOne } from './hidden/hiddenLayerOne';
import { hiddenLayerTwo } from './hidden/hiddenLayerTwo';
import { outputLayer } from './output/outputLayer';
import { runTraining } from '~/backProp/runTraining';

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
    console.log('Ran');
    runTraining(
      inputLayerOutput,
      hiddenLayerOneOutput,
      hiddenLayerTwoOutput,
      outputLayerOutput,
      desiredOutput
    );
  }

  return outputLayerOutput;
};
