import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/trpc'

const PostSchema = z.object({
  slug: z.string(),
})

export default router({
  createOrUpdate: publicProcedure
    .input(PostSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.post.upsert({
        where: {
          slug: input.slug,
        },
        update: {},
        create: {
          slug: input.slug,
        },
      })
    }),
  getTotalViews: publicProcedure
    .query(async ({ ctx }) => {
      const views = await ctx.prisma.post.aggregate({
        _sum: {
          views: true,
        },
      })
      return views._sum.views || 0
    }),
  view: publicProcedure
    .input(PostSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.post.update({
        where: {
          slug: input.slug,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      })
    }),
  getTotalLikes: publicProcedure
    .query(async ({ ctx }) => {
      const likes = await ctx.prisma.post.aggregate({
        _sum: {
          likes: true,
        },
      })
      return likes._sum.likes || 0
    }),
  like: publicProcedure
    .input(PostSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.post.update({
        where: {
          slug: input.slug,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      })
    }),
})
