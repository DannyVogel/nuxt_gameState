<script lang="ts" setup>
import type { Game } from "~/types/game.interfaces";
import { AtomSpinner } from "epic-spinners";

const { getGamesToPlay, updateGames } = useGameList();
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
    const { games, total: totalGames } = await getGamesToPlay(
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
    lazy: true,
  }
);

const runGameUpdate = async () => {
  const response = await updateGames(gamesToPlay.value.map((game) => game.id));
  gamesToPlay.value = response.games;
};

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

    <div
      v-if="status === 'success' || gamesToPlay.length > 0"
      class="mt-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <template v-for="game in gamesToPlay">
        <GameCardCompact view="to-play" :game="game" @close="fetchGames" />
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
        <span v-if="gamesToPlay.length >= total">No more games</span>
        <span v-else>No games found</span>
      </div>
    </div>
  </div>
</template>
