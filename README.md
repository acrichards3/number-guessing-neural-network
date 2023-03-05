# Number Guessing Neural Network Overview

This is a neural network built completely from the ground up only using React and Typescript. That means no libraries such as tensorflow and no data sets to go off of all of this was hand trained and written by me.

This neural network starts with a 28x28 grid of squares (a matrix) that are all initialized to 0. A user can then draw on this grid such that anywhere where their cursor goes, the value of 0 is turned into a 1. Dark squares are 0's and light squares are 1's. This matrix is then transformed into a single 784 neuron column (28 \* 28 squares) with the relevant 0's and 1's which then go through a series of layers to predict the final output.

## Building out the front end of the app

The front end of this app was built using React and TypeScript. The general steps taken to build out the UI included the following:

- Two arrays filled with zeros each of length 28 were mapped over to generate rows and columns. Using flexbox and other SCSS styling, I was able to create a grid. I have this initial grid stored as state using react's React.useState() hook.
- Using react's React.useState() hook, I am able to track if the user is clicking down or not, this state is used in conjunction with the x and y values of the matrix (grid) to regenerate the entire matrix using a setGrid() function from the useState hook. This updates the entire state therefore essentailly generating a new grid with values of 1 where the user "drew on"/
- I then created a reset button which when clicked will set the grid back to its initial state as a 28x28 matrix of all zeros.
- I also created a submit button that when clicked will run the matrix values through the network.
- Depending on the network's "choice" an answer will be displayed to the user what the highest probability answer is based on the input.
- Below this are two buttons asking if the network chose the number correctly, if the user selects no, the user is prompted to enter the correct answer which then gets run backwards through the network to adjust the weights and biases.

## Initializing the network

- This network consists of a total of 4 layers, the input layer (784 neurons), the first hidden layer (16 neurons), the second hidden layer (16 neurons), and the output layer (11 neurons). Note that the output layer consists of choices 0-9 as well as NaN in the case that the user draws something in the grid that isn't a valid number choice.
- The weights and biases are initialized using the initialize.js file located at '~/savedWeights/initialize.js'. This file was run exactly 1 time and only 1 time to give me randomized starting values for all of the weights and biases between all of the layers of the whole network.

## Forward Propagation

This section will discuss in detail how we go from the grid all the way to the answer.

### Input Layer

The input layer simply takes in the 28x28 user submitted grid and is transformed into a single array/column consisting of all 784 input values. These are the neurons that make up the input layer.
