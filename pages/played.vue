<script lang="ts" setup>
import type { UserGame } from "~/types/game.interfaces";
import { AtomSpinner } from "epic-spinners";

const listStore = useGameList();
const page = ref(1);
const limit = 10;
const el = ref<HTMLElement | null>(null);
const total = ref(0);
const currentFilters = ref({
  status: null as string | null,
  year: null as number | null,
  comments: null as boolean | null,
});

const {
  data: gamesPlayed,
  status,
  execute: fetchGames,
} = useAsyncData(
  "getGamesPlayed",
  async () => {
    const response = await listStore.getGamesPlayed(
      page.value,
      limit,
      currentFilters.value.status,
      currentFilters.value.year,
      currentFilters.value.comments
    );

    total.value = response.total;

    const yearsPlayed = Array.from(
      new Set(response.games.map((game) => game.yearPlayed))
    );
    return { games: response.games, yearsPlayed };
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
    lazy: true,
  }
);

const loadMore = async () => {
  if (status.value === "pending") return;
  if (
    !gamesPlayed.value?.games ||
    gamesPlayed.value.games.length >= total.value
  )
    return;
  page.value++;
  await fetchGames();
};

useInfiniteScroll(el, loadMore, {
  distance: 10,
  canLoadMore: () => {
    return (
      status.value !== "pending" &&
      gamesPlayed.value?.games &&
      gamesPlayed.value.games.length < total.value
    );
  },
});

const applyFilters = async (filters: {
  status: string | null;
  year: number | null;
  comments: boolean | null;
}) => {
  currentFilters.value = filters;
  page.value = 1;
  await fetchGames();
};

const clearFilters = async () => {
  currentFilters.value = {
    status: null,
    year: null,
    comments: null,
  };
  page.value = 1;
  await fetchGames();
};
</script>

<template>
  <div>
    <div class="flex flex-col items-center">
      <h3 class="text-2xl font-bold text-center text-primary">Games Played</h3>
      <GameFilters
        @apply-filters="applyFilters"
        @clear-filters="clearFilters"
      />
    </div>

    <div
      v-if="status === 'success' || gamesPlayed?.games.length > 0"
      class="flex flex-col"
    >
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
              <GameCardCompact view="played" :game="game" @close="fetchGames" />
            </template>
          </div>
        </div>
      </template>
    </div>

    <div
      v-if="status === 'pending'"
      class="flex justify-center items-center mt-10"
    >
      <atom-spinner
        :animation-duration="1000"
        :size="50"
        :color="'rgb(59 130 246 / 0.5)'"
        class="mx-auto"
      />
    </div>

    <div ref="el" class="py-4">
      <div v-if="status === 'success'" class="text-center text-gray-500">
        <span v-if="gamesPlayed?.games.length >= total">No more games</span>
        <span v-else>No games found</span>
      </div>
    </div>
  </div>
</template>
