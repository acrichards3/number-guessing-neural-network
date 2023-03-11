import { inputLayer } from '~/layers/input/inputLayer';
import { hiddenLayerOne } from '~/layers/hidden/hiddenLayerOne';
import { hiddenLayerTwo } from '~/layers/hidden/hiddenLayerTwo';
import { outputLayer } from '~/layers/output/outputLayer';
import DATA from '../../savedWeights/updatedWeights.json';
import { relu } from '~/functions/relu';

export const backPropagation = (
  inputActivations: number[],
  hidden1Activations: number[],
  hidden2Activations: number[],
  outputActivations: number[],
  MSEResult: number
) => {
  // return 2D bias matrix & 3D weight matrix for their gradients
};
