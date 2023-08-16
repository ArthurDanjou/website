import { publicProcedure, router } from '~/server/trpc/trpc'

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
      const today = new Date()
      return !!maintenance && maintenance.beginAt.getTime() < today.getTime() && maintenance.endAt.getTime() > today.getTime()
    }),
})
