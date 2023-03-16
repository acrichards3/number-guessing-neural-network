import { MSE } from '~/backProp/functions/MSE';
import { relu } from '~/functions/relu';
import { softmax } from '~/functions/softmax';

interface WeightsAndBiases {
  hiddenLayer1Weights: number[][];
  hiddenLayer1Biases: number[];
  hiddenLayer2Weights: number[][];
  hiddenLayer2Biases: number[];
  outputLayerWeights: number[][];
  outputLayerBiases: number[];
}

export const backPropagation = (
  userInput: number[][],
  values: WeightsAndBiases,
  desiredOutput: number[],
  learningRate: number
) => {
  const updatedOutputLayerBiases: number[] = [];
  const updatedHiddenLayer2Biases: number[] = [];
  const updatedHiddenLayer1Biases: number[] = [];

  const inputLayer = (grid: Array<Array<number>>): Array<number> => {
    const input = grid.flat();
    return input;
  };

  const hiddenLayerOne = (input: Array<number>) => {
    const weights = values.hiddenLayer1Weights;
    const biases = values.hiddenLayer1Biases;
    const neurons = 16;

    if (weights[0]?.length !== input.length) {
      throw new Error(
        `Weights and input are not the same length! Weights: ${weights[0]?.length}, Input: ${input.length}`
      );
    }

    if (neurons !== biases.length) {
      throw new Error(
        `Neurons and biases are not the same length! Neurons: ${neurons}, Biases: ${biases.length}`
      );
    }

    const weightedSum = weights.map((row) =>
      row.reduce((acc, curr, index) => {
        const currentInput = input[index];
        if (currentInput === undefined) {
          throw new Error(
            `Input value is undefined! Input: ${input}, Index: ${index}`
          );
        }
        return acc + curr * currentInput;
      }, 0)
    );

    const activations = weightedSum.map((sum, index) => {
      const currentBias = biases[index];
      if (currentBias === undefined) {
        throw new Error(
          `Bias value is undefined! Biases: ${biases}, Index: ${index}`
        );
      }
      return relu(sum + currentBias);
    });

    return activations;
  };

  const hiddenLayerTwo = (input: Array<number>) => {
    const weights = values.hiddenLayer2Weights;
    const biases = values.hiddenLayer2Biases;
    const neurons = 16;

    if (weights[0]?.length !== input.length) {
      throw new Error(
        `Weights and input are not the same length! Weights: ${weights[0]?.length}, Input: ${input.length}`
      );
    }

    if (neurons !== biases.length) {
      throw new Error(
        `Neurons and biases are not the same length! Neurons: ${neurons}, Biases: ${biases.length}`
      );
    }

    const weightedSum = weights.map((row) =>
      row.reduce((acc, curr, index) => {
        const currentInput = input[index];
        if (currentInput === undefined) {
          throw new Error(
            `Input value is undefined! Input: ${input}, Index: ${index}`
          );
        }
        return acc + curr * currentInput;
      }, 0)
    );

    const activations = weightedSum.map((sum, index) => {
      const currentBias = biases[index];
      if (currentBias === undefined) {
        throw new Error(
          `Bias value is undefined! Biases: ${biases}, Index: ${index}`
        );
      }
      return relu(sum + currentBias);
    });

    return activations;
  };

  const outputLayer = (input: Array<number>) => {
    const possibleOutputs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const weights = values.outputLayerWeights;
    const biases = values.outputLayerBiases;
    const neurons = possibleOutputs.length;

    if (weights[0]?.length !== input.length) {
      throw new Error(
        `Weights and input are not the same length! Weights: ${weights[0]?.length}, Input: ${input.length}`
      );
    }

    if (neurons !== biases.length) {
      throw new Error(
        `Neurons and biases are not the same length! Neurons: ${neurons}, Biases: ${biases.length}`
      );
    }

    const weightedSum = weights.map((row) =>
      row.reduce((acc, curr, index) => {
        const currentInput = input[index];
        if (currentInput === undefined) {
          throw new Error(
            `Input value is undefined! Input: ${input}, Index: ${index}`
          );
        }
        return acc + curr * currentInput;
      }, 0)
    );

    const activations = weightedSum.map((sum, index) => {
      const currentBias = biases[index];
      if (currentBias === undefined) {
        throw new Error(
          `Bias value is undefined! Biases: ${biases}, Index: ${index}`
        );
      }
      return sum + currentBias;
    });

    return softmax(activations);
  };

  const inputActivations = inputLayer(userInput);
  const hidden1Activations = hiddenLayerOne(inputActivations);
  const hidden2Activations = hiddenLayerTwo(hidden1Activations);
  const outputActivations = outputLayer(hidden2Activations);

  // console.log('CURRENT ERROR', MSE(outputActivations, desiredOutput));

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
  const updatedOutputLayerWeights = values.outputLayerWeights.map((row, i) => {
    const currOutputGradient = outputGradient[i];
    const currBias = values.outputLayerBiases[i];
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
      const currWeight = values.outputLayerWeights[i]?.[index];
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
  const updatedHiddenLayer2Weights = values.hiddenLayer2Weights.map(
    (row, i) => {
      const currHidden2Gradient = hidden2Gradient[i];
      const currBias = values.hiddenLayer2Biases[i];
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
    }
  );

  // 3. Gradients for hidden layer 1
  const hidden1Gradient = hidden1Activations.map((activation, index) => {
    const sum = hidden2Gradient.reduce((acc, curr, i) => {
      const currWeight = values.hiddenLayer2Weights[i]?.[index];
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
  const updatedHiddenLayer1Weights = values.hiddenLayer1Weights.map(
    (row, i) => {
      const currHidden1Gradient = hidden1Gradient[i];
      const currBias = values.hiddenLayer1Biases[i];
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
        return (
          weight - learningRate * currHidden1Gradient * currInputActivation
        );
      });
    }
  );

  // 4. Return the updated values and update JSON file
  const updatedValues = {
    hiddenLayer1Weights: updatedHiddenLayer1Weights,
    hiddenLayer1Biases: updatedHiddenLayer1Biases,
    hiddenLayer2Weights: updatedHiddenLayer2Weights,
    hiddenLayer2Biases: updatedHiddenLayer2Biases,
    outputLayerWeights: updatedOutputLayerWeights,
    outputLayerBiases: updatedOutputLayerBiases,
  };

  return updatedValues;
};
