import { publicProcedure, router } from '~/server/trpc/trpc'

export default router({
  announcement: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.announcement.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),
})
