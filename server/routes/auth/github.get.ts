export default oauth.githubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, {user}) {
    await setUserSession(event, {
      user: {
        email: user.email,
        picture: user.avatar_url,
        username: String(user.name).trim(),
        admin: user.email === process.env.NUXT_AUTH_ADMIN_EMAIL
      }
    })
    return sendRedirect(event, getCookie(event, 'last-route') || '/')
  },
  onError(error) {
    console.error('GitHub OAuth error:', error)
  }
})
