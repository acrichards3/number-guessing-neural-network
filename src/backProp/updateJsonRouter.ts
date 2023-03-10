import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import fs from 'fs/promises';

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

const updateJsonRouter = router({
  updateJson: publicProcedure
    .input(
      z.object({
        hiddenLayer1Weights: z
          .array(z.array(z.number()).length(16))
          .length(784),
        hiddenLayer2Weights: z.array(z.array(z.number()).length(16)).length(16),
        outputLayerWeights: z.array(z.array(z.number()).length(16)).length(11),
        hiddenLayer1Biases: z.array(z.number()).length(16),
        hiddenLayer2Biases: z.array(z.number()).length(16),
        outputLayerBiases: z.array(z.number()).length(11),
      })
    )
    .mutation((req) => {
      const updatedWeights = {
        hiddenLayer1Weights: req.input.hiddenLayer1Weights,
        hiddenLayer2Weights: req.input.hiddenLayer2Weights,
        outputLayerWeights: req.input.outputLayerWeights,
      };
      const updatedBiases = {
        hiddenLayer1Biases: req.input.hiddenLayer1Biases,
        hiddenLayer2Biases: req.input.hiddenLayer2Biases,
        outputLayerBiases: req.input.outputLayerBiases,
      };
      const updatedJson = {
        ...updatedWeights,
        ...updatedBiases,
      };
      fs.writeFile(
        '../savedWeights/updatedWeights.json',
        JSON.stringify(updatedJson)
      );
      console.log('Successfully updated JSON file!');
    }),
});

export default updateJsonRouter;
