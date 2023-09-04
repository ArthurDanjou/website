export default defineNuxtRouteMiddleware(async (to, from) => {
  let isMaintenance = true
  const { $trpc } = useNuxtApp()

  try {
    isMaintenance = await $trpc.maintenance.is.query()
  } catch (error) {
    return navigateTo('/maintenance')
  }

  if (isMaintenance) {
    return navigateTo('/maintenance')
  }
  if (!isMaintenance && to.path === '/maintenance') {
    return navigateTo('/')
  }
})
