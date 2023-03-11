export const MSE = (
  predictedOutput: Array<number>,
  desiredOutput: Array<number>
): number => {
  if (predictedOutput?.length !== desiredOutput?.length) {
    throw new Error(
      `Predicted and desired outputs are not the same length! Predicted: ${predictedOutput?.length}, Desired: ${desiredOutput?.length}`
    );
  }

  const sum = predictedOutput.reduce((acc, curr, index) => {
    const currentDesiredOutput = desiredOutput[index];
    if (currentDesiredOutput === undefined) {
      throw new Error(
        `Desired output value is undefined! Desired output: ${desiredOutput}, Index: ${index}`
      );
    }
    return acc + Math.pow(curr - currentDesiredOutput, 2);
  }, 0);
  return sum / predictedOutput.length;
};
