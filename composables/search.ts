export const useSearch = () => {
  const search = async (query: string) => {
    try {
      const response = await $fetch(`/api/search/${query}`, {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response) {
        return [];
      } else {
        return response.body || [];
      }
    } catch (error) {
      console.error(error);
      return [];
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
