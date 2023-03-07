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
- Below this are two buttons asking if the network chose the number correctly, if the user selects no, the user is prompted to select the correct answer from a list of options which then gets run backwards through the network to adjust the weights and biases.

## Initializing the network

- This network consists of a total of 4 layers, the input layer (784 neurons), the first hidden layer (16 neurons), the second hidden layer (16 neurons), and the output layer (11 neurons). Note that the output layer consists of choices 0-9 as well as NaN in the case that the user draws something in the grid that isn't a valid number choice.
- The weights and biases are initialized using the initialize.js file located at '~/savedWeights/initialize.js'. This file was run exactly 1 time and only 1 time to give me randomized starting values for all of the weights and biases between all of the layers of the whole network.

## Forward Propagation

This section will discuss in detail how we go from the grid all the way to the answer.

### Input Layer

- The input layer simply takes in the 28x28 user submitted grid and is transformed into a single array/column consisting of all 784 input values. These are the neurons that make up the input layer.

### First Hidden Layer

- For the activation functions used in the hidden layer of this network, I chose to use the ReLU (Rectified Linear Unit) function. I chose to use this function instead of the Sigmoid function because it's really easy to implement, it is computationally efficient, and it's a more modern solution over sigmoid. As for how the first layer is calculated, I first pass in the 784 neurons from the input layer.
- I also declare the size of the first input layer (16 neurons in this case).
- From here, I'm using JavaScript's built in reduce function to calculate the total sum of all of the inputs from the input layer.
- I'm also bringing in all of the randomly initialized biases from my JSON file which I also use the reduce function to add all of the weights together for all of the possible connections between the 784 neurons in the input layer and the 16 neurons in the first hidden layer.
- Once I have the input sum as well as the array of weight sums and the 16 randimly initialized biases for the first hidden layer. I can run them through a function that loops over the weightedSum array and returns a new array based on the following: (inputSum + weightedSumArr[i] + biases[i]).
- This gives me an array of 16 numbers which represent the inputs to put in my ReLU activation function.
- I map through this array, applying the ReLU function and returning the updated array with the output values. This is what is used as the input for the second hidden layer.

### Second Hidden Layer

- Since this is a simple neural net that is performing a rather basic task, the second hidden layer basically goes throgh the exact same process as the first hidden layer with the exception that the input is the length 16 array output from the first hidden layer.
- This network goes through all of the same steps fromthe previous layer to return the output which will be used as the input for the output layer.

### Output layer

- Once again, we repeat the steps from the previous two hidden layers which gives an output except this time we run this final output through another activation function known as the softmax function which returns the output from the very last ReLU activation function and displays it as an array of probability distribution.
- The numbers in this array will always add up to 1, and the result with the highest number is what the network "chooses" as its answer.
- Since the weights and biases are completely rendomized before training, the results are not accurate at all.

### Result

At the end of this process I return the single number result that is displayed to the end user as well as the softmax result which will be used to calculate the loss in the loss function. If the network chooses incorrectly, the user can choose the actual correct answer which will then be compared with the network's output. The loss between these two numbers is used to tell the computer how far off it was from the desired result.
