export default oauth.googleEventHandler({
  config: {
    redirectUrl: '/talents',
  },
  async onSuccess(event: any, { user }: any) {
    await setUserSession(event, {
      user: {
        email: user.email,
        picture: user.picture,
        username: String(user.name).trim(),
      },
    })
    return sendRedirect(event, '/')
  },
})
