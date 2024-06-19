import { createStorage } from "unstorage";

const tokenStorage = createStorage<TokenObject>();

export const setToken = async (token: TokenResponse) => {
  let tokenObj = {
    access_token: token.access_token,
    expiration_date: new Date(Date.now() + token.expires_in * 1000),
    token_type: token.token_type,
  };
  await tokenStorage.setItem("token", tokenObj);
};

export const getToken = async () => {
  const storedTokenObj = await tokenStorage.getItem("token");
  if (!storedTokenObj) {
    console.log("no token");
    const response = await $fetch("/api/auth/token");
    if (response.statusCode === 200) {
      return response.body.access_token;
    }
  } else if (storedTokenObj.expiration_date < new Date()) {
    console.log("token expired");
    const response = await $fetch("/api/auth/token");
    if (response.statusCode === 200) {
      return response.body.access_token;
    }
  } else {
    console.log("we have a token");
    const response = await $fetch(
      `/api/auth/validate/${storedTokenObj.access_token}`
    );
    if (response.status !== 401 || response.status !== 500) {
      return storedTokenObj.access_token;
    } else {
      console.log("invalid token");
      const response = await $fetch("/api/auth/token");
      if (response.statusCode === 200) {
        return response.body.access_token;
      }
    }
  }
};
