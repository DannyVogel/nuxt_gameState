export const useUser = () => {
  const setDisplayName = async (displayName: string) => {
    try {
      const res = await $fetch("/api/user/username", {
        method: "POST",
        body: {
          displayName,
        },
      });
      console.log("username res", res);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    setDisplayName,
  };
};
