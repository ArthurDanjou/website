import { publicProcedure, router } from '../trpc'

export default router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.announcement.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),
})
