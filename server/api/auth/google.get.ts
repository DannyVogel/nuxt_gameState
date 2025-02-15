const { googleRedirectURL } = useRuntimeConfig();

export default oauthGoogleEventHandler({
  config: {
    redirectURL: googleRedirectURL || undefined,
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user,
      secure: tokens.id_token,
      loggedInAt: new Date(),
      displayName: user.given_name || user.email,
    });
    return sendRedirect(event, "/");
  },
});
