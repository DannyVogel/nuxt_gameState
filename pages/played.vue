<script lang="ts" setup>
import type { UserGame } from "~/types/game.interfaces";

const listStore = useGameList();
const page = ref(1);
const limit = 10;
const el = ref<HTMLElement | null>(null);
const total = ref(0);

const {
  data: gamesPlayed,
  status,
  execute: fetchGames,
} = useAsyncData(
  "getGamesPlayed",
  async () => {
    const { games, total: totalGames } = await listStore.getGamesPlayed(
      page.value,
      limit
    );
    total.value = totalGames;

    const yearsPlayed = Array.from(
      new Set(games.map((game) => game.yearPlayed))
    );
    return { games, yearsPlayed };
  },
  {
    transform: (data: {
      games: UserGame[];
      yearsPlayed: number[];
    }): {
      games: UserGame[];
      yearsPlayed: number[];
    } => {
      if (page.value === 1) return data;
      return {
        games: [...(gamesPlayed.value?.games || []), ...data.games],
        yearsPlayed: Array.from(
          new Set([
            ...(gamesPlayed.value?.yearsPlayed || []),
            ...data.yearsPlayed,
          ])
        ),
      };
    },
    default() {
      return { games: [], yearsPlayed: [] };
    },
  }
);

const loadMore = async () => {
  if (status.value === "pending") return;
  if (gamesPlayed.value?.games.length >= total.value) return;
  page.value++;
  await fetchGames();
};

useInfiniteScroll(el, loadMore, {
  distance: 10,
  canLoadMore: () => gamesPlayed.value?.games.length < total.value,
});

// const applyFilters = (years: number[], games: UserGame[]) => {
//   yearsPlayed.value = years;
//   gamesPlayed.value = games;
// };

// const clearFilters = () => {
//   yearsPlayed.value = listStore.yearsPlayed;
//   gamesPlayed.value = listStore.gamesPlayed;
// };
</script>

<template>
  <div>
    <div class="flex flex-col items-center">
      <h3 class="text-2xl font-bold text-center text-primary">Games Played</h3>
      <GameFilters />
    </div>
    <div class="flex flex-col">
      <template v-for="year in gamesPlayed?.yearsPlayed">
        <div class="mt-7 flex flex-col gap-2">
          <h4
            class="w-fit text-xl font-bold text-primary bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent"
          >
            {{ year }}
          </h4>
          <div class="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
            <template
              v-for="game in gamesPlayed?.games.filter(
                (game) => game.yearPlayed === year
              )"
            >
              <GameCardCompact view="played" :game="game" />
            </template>
          </div>
        </div>
      </template>
    </div>

    <div ref="el" class="py-4">
      <div v-if="status === 'pending'" class="text-center">
        <span class="animate-pulse">Loading...</span>
      </div>
      <div
        v-else-if="gamesPlayed?.games.length >= total"
        class="text-center text-gray-500"
      >
        <span>No more games</span>
      </div>
    </div>
  </div>
</template>
