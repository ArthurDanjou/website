import { publicProcedure, router } from '../trpc'

export default router({
  get: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.maintenance.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),
  is: publicProcedure
    .query(async ({ ctx }) => {
      const maintenance = await ctx.prisma.maintenance.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      })

      if (process.env.NODE_ENV === 'development')
        return false

      const today = new Date()
      return !!maintenance
      && maintenance.enabled
      && maintenance.beginAt.getTime() < today.getTime()
      && maintenance.endAt.getTime() > today.getTime()
    }),
})
