<script lang="ts" setup>
import type { Game } from "~/types/game.interfaces";
const listStore = useGameList();
const page = ref(1);
const limit = 10;
const el = ref<HTMLElement | null>(null);
const total = ref(0);
const sort = ref<"ASC" | "DESC">("ASC");

const {
  data: gamesToPlay,
  status,
  execute: fetchGames,
} = useAsyncData(
  "getGamesToPlay",
  async () => {
    const { games, total: totalGames } = await listStore.getGamesToPlay(
      page.value,
      limit,
      sort.value
    );
    total.value = totalGames;
    return games || [];
  },
  {
    transform: (games: Game[]): Game[] => {
      if (page.value === 1) return games;
      return [...(gamesToPlay.value || []), ...games];
    },
    default() {
      return [];
    },
    watch: [sort],
  }
);

const toggleSort = async () => {
  gamesToPlay.value = [];
  page.value = 1;
  sort.value = sort.value === "DESC" ? "ASC" : "DESC";
};

const loadMore = async () => {
  if (status.value === "pending") return;
  if (gamesToPlay.value?.length >= total.value) return;
  page.value++;
  await fetchGames();
};

useInfiniteScroll(el, loadMore, {
  distance: 10,
  canLoadMore: () => gamesToPlay.value?.length < total.value,
});
</script>

<template>
  <div>
    <div class="flex flex-col justify-between items-center">
      <h3 class="text-2xl font-bold text-primary">Games To Play</h3>
      <UButton
        @click="toggleSort"
        icon="i-heroicons-arrows-up-down"
        :class="{ 'rotate-180': sort === 'ASC' }"
        variant="ghost"
      />
    </div>
    <div class="mt-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="game in gamesToPlay">
        <GameCardCompact view="to-play" :game="game" @close="fetchGames" />
      </template>
    </div>

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
