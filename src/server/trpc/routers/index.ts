import announcement from './announcement'
import maintenance from './maintenance'
import talents from './talents'
import post from './post'
import { router } from '~/server/trpc/trpc'

export const appRouter = router({
  announcement,
  post,
  talents,
  maintenance,
})

export type AppRouter = typeof appRouter
