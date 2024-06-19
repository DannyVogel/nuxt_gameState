import { setToken } from "~/server/services/tokenManager";

export default eventHandler(async (event) => {
  console.log("/api/auth/token.get.ts");
  const config = useRuntimeConfig();
  const IGDBClientId = config.IGDBClientId;
  const IGDBClientSecret = config.IGDBClientSecret;

  const response = await $fetch<Promise<TokenResponse>>(
    `https://id.twitch.tv/oauth2/token`,
    {
      method: "POST",
      query: {
        client_id: IGDBClientId,
        client_secret: IGDBClientSecret,
        grant_type: "client_credentials",
      },
    }
  ).catch((error) => {
    console.error("error", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message,
    });
  });
  console.log("get token response", response);
  if (!response) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to get token",
    });
  }
  await setToken(response);
  return {
    statusCode: 200,
    body: response,
  };
});
