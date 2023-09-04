export default defineNuxtRouteMiddleware(async (to) => {
  const isMaintenance = ref<boolean>(true)
  const { $trpc } = useNuxtApp()

  try {
    isMaintenance.value = await $trpc.maintenance.is.query()
  }
  catch (error) {
    return navigateTo('/maintenance')
  }

  if (isMaintenance.value && to.path !== '/maintenance') {
    return navigateTo('/maintenance', {
      redirectCode: 301,
    })
  }

  if (!isMaintenance.value && to.path === '/maintenance') {
    return navigateTo('/', {
      redirectCode: 301,
      replace: true,
    })
  }
})
