/* eslint-disable node/prefer-global/process */
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/writing' && process.env.NODE_ENV !== 'development') {
    return navigateTo('/', {
      redirectCode: 301,
    })
  }
})
