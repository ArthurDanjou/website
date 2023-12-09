export default defineEventHandler(async () => {
  const maintenance = await usePrisma().maintenance.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  })
  let enabled = true
  if (process.env.NODE_ENV === 'development') {
    enabled = false
  }
  else {
    const today = new Date()
    enabled = !!maintenance
    && maintenance.enabled
    && maintenance.beginAt.getTime() < today.getTime()
    && maintenance.endAt.getTime() > today.getTime()
  }

  return {
    enabled,
    maintenance,
  }
})
