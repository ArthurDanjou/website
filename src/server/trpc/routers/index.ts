import { z } from 'zod'
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
})

export type AppRouter = typeof appRouter
