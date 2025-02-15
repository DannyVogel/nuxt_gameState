const { googleRedirectURL } = useRuntimeConfig();

export default oauthGoogleEventHandler({
  config: {
    redirectURL: googleRedirectURL || undefined,
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        ...user,
        displayName: user.given_name || user.email,
      },
      secure: tokens.id_token,
      loggedInAt: new Date(),
    });
    return sendRedirect(event, "/");
  },
});
