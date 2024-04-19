export default defineEventHandler(async (event) => {
  const { favorite, category } = getQuery(event)

  const bookmarks = await useDB().query.bookmarks
    .findMany({
      orderBy: [asc(tables.talents.id)],
      with: {
        bookmarkCategories: {
          with: {
            category: true,
          },
        },
      },
    })

  return bookmarks.filter(bookmark =>
    (category === 'all' || bookmark.bookmarkCategories.some(cat => cat.category.slug === category))
    && (favorite === 'false' || bookmark.favorite),
  )
})
