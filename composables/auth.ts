export const useAuth = () => {
  const userStore = useUserStore();

  const logIn = async (email: string, password: string) => {
    try {
      const res = await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });
      if (res.statusCode === 200 && res.payload) {
        userStore.setUser(res.payload);
      }
    } catch (error: any) {
      console.error(error.message);
      return {
        success: false,
        errorMessage: error.message,
      };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const res = await $fetch("/api/auth/register", {
        method: "POST",
        body: {
          email,
          password,
        },
      });
      if (res.statusCode === 200 && res.payload) {
        userStore.setUser(res.payload);
      }
    } catch (error: any) {
      console.error(error.message);
      return {
        success: false,
        errorMessage: error.message,
      };
    }
  };

  const logOut = async () => {
    try {
      $fetch("/api/auth/logout", {
        method: "POST",
      });
      userStore.logOut();
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  const guestLogIn = async () => {
    try {
      const res = await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          email: "guest@guest.com",
          password: "123456",
        },
      });
      if (res.statusCode === 200 && res.payload) {
        userStore.setUser(res.payload);
      }
    } catch (error: any) {
      console.error(error.message);
      return {
        success: false,
        errorMessage: error.message,
      };
    }
  };

  return {
    logIn,
    register,
    logOut,
    guestLogIn,
  };
};
