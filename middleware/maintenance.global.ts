export default defineNuxtRouteMiddleware(async (to) => {
  const isMaintenance = ref<boolean>(true)
  try {
    await $fetch('/api/maintenance').then((maintenance) => {
      isMaintenance.value = maintenance.enabled
    })
  }
  catch (error) {
    return navigateTo('/maintenance')
  }

  if (isMaintenance.value && to.path !== '/maintenance') {
    return navigateTo('/maintenance', {
      redirectCode: 301
    })
  }

  if (!isMaintenance.value && to.path === '/maintenance') {
    return navigateTo('/', {
      redirectCode: 301,
      replace: true
    })
  }
})
