export default defineEventHandler(async (event) => {
  const { favorite, category } = getQuery(event)

  const talents = await useDB().query.talents
    .findMany({
      orderBy: [asc(tables.talents.id)],
      with: {
        talentCategories: {
          with: {
            category: true,
          },
        },
      },
    })

  return talents.filter(talent =>
    (category === 'all' || talent.talentCategories.some(cat => cat.category.slug === category))
    && (favorite === 'false' || talent.favorite),
  )
})
