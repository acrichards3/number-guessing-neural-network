import { inputLayer } from './input/inputLayer';
import { hiddenLayerOne } from './hidden/hiddenLayerOne';
import { hiddenLayerTwo } from './hidden/hiddenLayerTwo';
import { outputLayer } from './output/outputLayer';
import { softmax } from '~/functions/softmax';

export const runPrediction = (input: Array<Array<number>> | undefined) => {
  if (!input) return undefined;

  const possibleOutputs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'Not a valid answer.'];

  const inputLayerOutput = inputLayer(input);
  const hiddenLayerOneOutput = hiddenLayerOne(inputLayerOutput);
  const hiddenLayerTwoOutput = hiddenLayerTwo(hiddenLayerOneOutput);
  const outputLayerOutput = outputLayer(hiddenLayerTwoOutput);

  const makePrediction = () => {
    const prediction = outputLayerOutput.indexOf(
      Math.max(...outputLayerOutput)
    );
    if (possibleOutputs[prediction] === undefined) {
      throw new Error(
        'Fix this terrible code, you idiot. The prediction index doesnt exist within the possibleOutputs array.'
      );
    }
    return possibleOutputs[prediction];
  };

  console.log(outputLayerOutput, makePrediction(), 'RETURN VALUE');
  return [outputLayerOutput, makePrediction()];
};
