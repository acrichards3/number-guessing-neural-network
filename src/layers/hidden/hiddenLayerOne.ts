import { inputLayer } from '../input/inputLayer';
import { SIGMOID } from '~/functions/sigmoid';
import { relu } from '~/functions/relu';

const size = 16;

export const hiddenLayerOne = (input: number[] | undefined) => {
  if (!input) return;

  const weights = new Array(size)
    .fill(0)
    .map(() => new Array(size).fill(0).map(() => Math.random()));
  console.log(weights, 'WEIGHTS');

  return input;
};
