import { inputLayer } from './input/inputLayer';
import { hiddenLayerOne } from './hidden/hiddenLayerOne';
import { hiddenLayerTwo } from './hidden/hiddenLayerTwo';
import { outputLayer } from './output/outputLayer';

export const prediction = (input: number[][] | undefined) => {
  if (!input) return;

  const inputLayerOutput = inputLayer(input);
  const hiddenLayerOneOutput = hiddenLayerOne(inputLayerOutput);
  // const hiddenLayerTwoOutput = hiddenLayerTwo(hiddenLayerOneOutput);
  // const outputLayerOutput = outputLayer(hiddenLayerTwoOutput);

  //return outputLayerOutput;
};