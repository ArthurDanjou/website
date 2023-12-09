export default defineEventHandler(async (event) => {
  const { favorite, category } = getQuery(event)
  const prisma = usePrisma()

  let whereClause: any

  if (favorite === 'true') {
    category === 'all'
      ? whereClause = {
        favorite: true,
        categories: { every: { category: {} } },
      }
      : whereClause = {
        favorite: true,
        categories: { some: { category: { slug: category } } },
      }
  }
  else {
    category === 'all'
      ? whereClause = {
        categories: { every: { category: {} } },
      }
      : whereClause = {
        categories: { some: { category: { slug: category } } },
      }
  }

  return await prisma.talent.findMany({
    where: whereClause,
    orderBy: {
      name: 'asc',
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
  })
})
