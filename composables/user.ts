export const useUser = () => {
  const setDisplayName = async (displayName: string) => {
    try {
      const res = await $fetch("/api/user/displayname", {
        method: "POST",
        body: {
          displayName,
        },
      });
      if (res.statusCode === 200) {
        useUserStore().displayName = res.payload.displayName;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    setDisplayName,
  };
};
