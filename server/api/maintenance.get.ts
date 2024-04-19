export default defineEventHandler(async () => {
	const maintenance = await useDB().query.maintenances.findFirst({
		orderBy: [asc(tables.maintenances.createdAt)],
	})
	let enabled = true

	if (process.env.NODE_ENV === 'development') {
		enabled = false
	}
	else {
		const today = new Date()
		enabled = !!maintenance
		&& maintenance.enabled
		&& new Date(maintenance.beginAt).getTime() < today.getTime()
		&& new Date(maintenance.endAt).getTime() > today.getTime()
	}

	return {
		enabled,
		maintenance,
	}
})
