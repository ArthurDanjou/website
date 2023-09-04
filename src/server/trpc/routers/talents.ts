import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export default router({
  getTalents: publicProcedure
    .input(z.object({
      favorite: z.boolean(),
      category: z.union([z.string(), z.literal('all')]),
    }))
    .query(async ({ ctx, input }) => {
      if (input.favorite) {
        return input.category === 'all'
          ? await ctx.prisma.talent.findMany({
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              categories: {
                include: {
                  talent: true,
                  category: true,
                },
                orderBy: {
                  category: {
                    name: 'asc',
                  },
                },
              },
            },
            where: {
              favorite: true,
              categories: { every: { category: {} } },
            },
          })
          : await ctx.prisma.talent.findMany({
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              categories: {
                include: {
                  talent: true,
                  category: true,
                },
                orderBy: {
                  category: {
                    name: 'asc',
                  },
                },
              },
            },
            where: {
              favorite: true,
              categories: { some: { category: { slug: input.category } } },
            },
          })
      }
      else {
        return input.category === 'all'
          ? await ctx.prisma.talent.findMany({
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              categories: {
                include: {
                  talent: true,
                  category: true,
                },
                orderBy: {
                  category: {
                    name: 'asc',
                  },
                },
              },
            },
            where: {
              categories: { every: { category: {} } },
            },
          })
          : await ctx.prisma.talent.findMany({
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              categories: {
                include: {
                  talent: true,
                  category: true,
                },
                orderBy: {
                  category: {
                    name: 'asc',
                  },
                },
              },
            },
            where: {
              categories: { some: { category: { slug: input.category } } },
            },
          })
      }
    }),
  getCategories: publicProcedure
    .query(async ({ ctx }) => {
      return await ctx.prisma.category.findMany({
        where: {
          type: 'TALENT',
        },
      })
    }),
})
