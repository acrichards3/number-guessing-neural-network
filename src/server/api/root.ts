import { createTRPCRouter } from '../../server/api/trpc';
import { updateJsonRouter } from '../api/routers/updateJsonRouter';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  updateJson: updateJsonRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
