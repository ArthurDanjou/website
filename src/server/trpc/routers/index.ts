import { z } from 'zod'
import announcement from './announcement'
import { publicProcedure, router } from '~/server/trpc/trpc'

export const appRouter = router({
  hello: publicProcedure
    .input(z.object({
      name: z.string().optional(),
    }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name ?? 'World'}!`,
      }
    }),
  announcement,
})

export type AppRouter = typeof appRouter
