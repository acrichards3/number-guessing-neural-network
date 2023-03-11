import { MSE } from './functions/MSE';
import { backPropagation } from './functions/backPropagation';

export const runTraining = (
  inputLayerOutput: Array<number> | undefined,
  hiddenLayerOneOutput: Array<number> | undefined,
  hiddenLayerTwoOutput: Array<number> | undefined,
  predictedOutput: Array<number> | undefined,
  desiredOutput: Array<number> | undefined
): void => {
  if (
    inputLayerOutput === undefined ||
    hiddenLayerOneOutput === undefined ||
    hiddenLayerTwoOutput === undefined ||
    predictedOutput === undefined ||
    desiredOutput === undefined
  ) {
    throw new Error('One or more layers are undefined!');
  }

  const meanSquaredError = MSE(predictedOutput, desiredOutput);
  const backProp = backPropagation(
    inputLayerOutput,
    hiddenLayerOneOutput,
    hiddenLayerTwoOutput,
    predictedOutput,
    meanSquaredError
  );
};
