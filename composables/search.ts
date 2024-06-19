export const useSearch = () => {
  const search = async (query: string) => {
    try {
      const response = await $fetch(`/api/search/${query}`, {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response) {
        return null;
      } else {
        return response.body || null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const updateGameById = async (gameId: string) => {
    // TODO: Implement this function
  };

  return {
    search,
    updateGameById,
  };
};
