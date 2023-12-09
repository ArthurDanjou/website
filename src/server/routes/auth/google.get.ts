export default oauth.githubEventHandler({
  async onSuccess(event: any, { user }: any) {
    await setUserSession(event, {
      user: {
        email: user.email,
        picture: user.photoUrl,
        username: String(user.displayName).trim(),
      },
    })
    return sendRedirect(event, '/')
  },
})
