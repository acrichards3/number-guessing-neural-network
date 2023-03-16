import DATA from '../../savedWeights/updatedWeights.json';

export const backPropagation = (
  inputActivations: number[],
  hidden1Activations: number[],
  hidden2Activations: number[],
  outputActivations: number[],
  desiredOutput: number[],
  learningRate: number
) => {
  const updatedOutputLayerBiases: number[] = [];
  const updatedHiddenLayer2Biases: number[] = [];
  const updatedHiddenLayer1Biases: number[] = [];

  // 1. Gradients for output layer
  const outputGradient = outputActivations.map((activation, index) => {
    const currDesired = desiredOutput[index];
    if (currDesired === undefined) {
      throw new Error(
        `Desired output is undefined! Desired output: ${desiredOutput}, Index: ${index}`
      );
    }
    return activation - currDesired;
  });

  // 1a. Update weights and biases for output layer
  const updatedOutputLayerWeights = DATA.outputLayerWeights.map((row, i) => {
    const currOutputGradient = outputGradient[i];
    const currBias = DATA.outputLayerBiases[i];
    if (currBias === undefined) {
      throw new Error(`Bias is undefined! Bias: ${currBias}`);
    }
    if (currOutputGradient === undefined) {
      throw new Error(
        `Output gradient is undefined! Output gradient: ${currOutputGradient}`
      );
    }
    updatedOutputLayerBiases.push(currBias - learningRate * currOutputGradient);
    return row.map((weight, j) => {
      const currHidden2Activation = hidden2Activations[j];
      if (currHidden2Activation === undefined) {
        throw new Error(
          `Output gradient or hidden layer 2 activation is undefined! Output gradient: ${currOutputGradient}, Hidden layer 2 activation: ${currHidden2Activation}`
        );
      }
      return weight - learningRate * currOutputGradient * currHidden2Activation;
    });
  });

  // 2. Gradients for hidden layer 2
  const hidden2Gradient = hidden2Activations.map((activation, index) => {
    const sum = outputGradient.reduce((acc, curr, i) => {
      const currWeight = DATA.outputLayerWeights[i]?.[index];
      if (currWeight === undefined) {
        throw new Error(
          `Output layer weight is undefined! Output layer weight: ${currWeight}`
        );
      }
      return acc + curr * currWeight;
    }, 0);
    return activation > 0 ? sum : 0;
  });

  // 2a. Update weights and biases for hidden layer 2
  const updatedHiddenLayer2Weights = DATA.hiddenLayer2Weights.map((row, i) => {
    const currHidden2Gradient = hidden2Gradient[i];
    const currBias = DATA.hiddenLayer2Biases[i];
    if (currBias === undefined) {
      throw new Error(`Bias is undefined! Bias: ${currBias}`);
    }
    if (currHidden2Gradient === undefined) {
      throw new Error(
        `Hidden layer 2 gradient is undefined! Hidden layer 2 gradient: ${currHidden2Gradient}`
      );
    }
    updatedHiddenLayer2Biases.push(
      currBias - learningRate * currHidden2Gradient
    );
    return row.map((weight, j) => {
      const currHidden1Activation = hidden1Activations[j];
      if (currHidden1Activation === undefined) {
        throw new Error(
          `Hidden layer 2 gradient or hidden layer 1 activation is undefined! Hidden layer 2 gradient: ${currHidden2Gradient}, Hidden layer 1 activation: ${currHidden1Activation}`
        );
      }
      return (
        weight - learningRate * currHidden2Gradient * currHidden1Activation
      );
    });
  });

  // 3. Gradients for hidden layer 1
  const hidden1Gradient = hidden1Activations.map((activation, index) => {
    const sum = hidden2Gradient.reduce((acc, curr, i) => {
      const currWeight = DATA.hiddenLayer2Weights[i]?.[index];
      if (currWeight === undefined) {
        throw new Error(
          `Hidden layer 2 weight is undefined! Hidden layer 2 weight: ${currWeight}`
        );
      }
      return acc + curr * currWeight;
    }, 0);
    return activation > 0 ? sum : 0;
  });

  // 3a. Update weights and biases for hidden layer 1
  const updatedHiddenLayer1Weights = DATA.hiddenLayer1Weights.map((row, i) => {
    const currHidden1Gradient = hidden1Gradient[i];
    const currBias = DATA.hiddenLayer1Biases[i];
    if (currBias === undefined) {
      throw new Error(`Bias is undefined! Bias: ${currBias}`);
    }
    if (currHidden1Gradient === undefined) {
      throw new Error(
        `Hidden layer 1 gradient is undefined! Hidden layer 1 gradient: ${currHidden1Gradient}`
      );
    }
    updatedHiddenLayer1Biases.push(
      currBias - learningRate * currHidden1Gradient
    );
    return row.map((weight, j) => {
      const currInputActivation = inputActivations[j];
      if (currInputActivation === undefined) {
        throw new Error(
          `Hidden layer 1 gradient or input activation is undefined! Hidden layer 1 gradient: ${currHidden1Gradient}, Input activation: ${currInputActivation}`
        );
      }
      return weight - learningRate * currHidden1Gradient * currInputActivation;
    });
  });
};
