export default defineEventHandler(async (event) => {
	const { type } = getQuery<{ type: 'talent' | 'bookmark' }>(event)
	return useDB().select().from(tables.categories).where(eq(tables.categories.type, type))
})
