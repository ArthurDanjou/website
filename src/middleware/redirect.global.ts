export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/bookmarks' || to.path === 'writing') {
    return navigateTo('/', {
      redirectCode: 301,
    })
  }
})
