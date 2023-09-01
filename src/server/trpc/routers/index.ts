import { router } from '../trpc'
import announcement from './announcement'
import maintenance from './maintenance'
import post from './post'
import talents from './talents'

export const appRouter = router({
  announcement,
  post,
  talents,
  maintenance,
})

export type AppRouter = typeof appRouter
