export default eventHandler(async (event) => {
  console.log("/api/auth/validate/token.get.ts");
  const token = getRouterParam(event, "token");
  const response = await $fetch("https://id.twitch.tv/oauth2/validate", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    console.error("error", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: error.message,
    });
  });
  console.log("response", response);
  if (!response) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to get token",
    });
  } else if (response.status === 401) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
      message: "Invalid token",
    });
  }
  return response;
});
