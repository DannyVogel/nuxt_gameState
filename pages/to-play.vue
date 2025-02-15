<script lang="ts" setup>
import type { Game } from "~/types/game.interfaces";
const listStore = useGameList();
const page = ref(1);
const limit = 10;
const el = ref<HTMLElement | null>(null);
const total = ref(0);

const {
  data: gamesToPlay,
  status,
  execute: fetchGames,
} = useAsyncData(
  "getGamesToPlay",
  async () => {
    const { games, total: totalGames } = await listStore.getGamesToPlay(
      page.value,
      limit
    );
    total.value = totalGames;
    return games || [];
  },
  {
    transform: (games: Game[]): Game[] => {
      // If it's the first page, return as is
      if (page.value === 1) return games;
      // Otherwise, append to existing games
      return [...(gamesToPlay.value || []), ...games];
    },
    default() {
      return [];
    },
  }
);

// Load more games
const loadMore = async () => {
  if (status.value === "pending") return;
  // Check if we've loaded all games
  if (gamesToPlay.value?.length >= total.value) return;

  page.value++;
  await fetchGames();
};

// Setup infinite scroll
useInfiniteScroll(el, loadMore, {
  distance: 10,
  canLoadMore: () => gamesToPlay.value?.length < total.value,
});
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold text-center text-primary">Games To Play</h3>
    <div class="mt-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="game in gamesToPlay">
        <GameCardCompact view="to-play" :game="game" />
      </template>
    </div>

    <!-- Scroll observer and loading indicator -->
    <div ref="el" class="py-4">
      <div v-if="status === 'pending'" class="text-center">
        <span class="animate-pulse">Loading...</span>
      </div>
      <div
        v-else-if="gamesToPlay?.length >= total"
        class="text-center text-gray-500"
      >
        <span>No more games</span>
      </div>
    </div>
  </div>
</template>
