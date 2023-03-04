const { writeFile } = require('fs');

/*
    This file should only be run once to initialize the weights and biases. If you run this file again, it will overwrite the existing weights and biases with random values.

    To run this file, open a new terminal, and cd into the relevant path to get here, then run the following command in the terminal:
    node initialize.js
*/

const rows = 28;
const columns = 28;

// Number of neurons in each layer
const inputLayerSize = rows * columns;
const hiddenLayer1Size = 16;
const hiddenLayer2Size = 16;
const outputLayerSize = 11;

// Randomly initialize weights and biases
const hiddenLayer1Weights = [...Array(hiddenLayer1Size)].map(() =>
  [...Array(inputLayerSize)].map(() => Math.random())
);
const hiddenLayer1Biases = [...Array(hiddenLayer1Size)].map(() =>
  Math.random()
);

const hiddenLayer2Weights = [...Array(hiddenLayer2Size)].map(() =>
  [...Array(hiddenLayer1Size)].map(() => Math.random())
);
const hiddenLayer2Biases = [...Array(hiddenLayer2Size)].map(() =>
  Math.random()
);

const outputLayerWeights = [...Array(outputLayerSize)].map(() =>
  [...Array(hiddenLayer2Size)].map(() => Math.random())
);
const outputLayerBiases = [...Array(outputLayerSize)].map(() => Math.random());

// Create a JSON object with the weights and biases
const weightsBiases = {
  hiddenLayer1Weights,
  hiddenLayer1Biases,
  hiddenLayer2Weights,
  hiddenLayer2Biases,
  outputLayerWeights,
  outputLayerBiases,
};

// Write the JSON object to a file
writeFile('updatedWeights.json', JSON.stringify(weightsBiases), (err) => {
  if (err) throw err;
  console.log('Weights and biases saved to file');
});
