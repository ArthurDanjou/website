import announcement from '~/server/trpc/routers/announcement'
import maintenance from '~/server/trpc/routers/maintenance'
import talents from '~/server/trpc/routers/talents'
import post from '~/server/trpc/routers/post'
import { router } from '~/server/trpc/trpc'

export const appRouter = router({
  announcement,
  post,
  talents,
  maintenance,
})

export type AppRouter = typeof appRouter
