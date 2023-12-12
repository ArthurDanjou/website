export default oauth.googleEventHandler({
  async onSuccess(event: any, { user }: any) {
    await setUserSession(event, {
      user: {
        email: user.email,
        picture: user.picture,
        username: String(user.name).trim(),
        // eslint-disable-next-line node/prefer-global/process
        admin: user.email === process.env.NUXT_AUTH_ADMIN_EMAIL,
      },
    })
    return sendRedirect(event, getCookie(event, 'last-route') || '/')
  },
  onError(error: any) {
    console.error('Google OAuth error:', error)
  },
})
