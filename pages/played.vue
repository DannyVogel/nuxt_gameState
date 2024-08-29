<script lang="ts" setup>
import type { UserGame } from "~/types/game.interfaces";

const userStore = useUserStore();
const yearsPlayed = ref<number[]>(userStore.getYearsPlayed);
const gamesPlayed = ref<UserGame[]>(userStore.getGamesPlayed);

const applyFilters = (years: number[], games: UserGame[]) => {
  yearsPlayed.value = years;
  gamesPlayed.value = games;
};

const clearFilters = () => {
  yearsPlayed.value = userStore.getYearsPlayed;
  gamesPlayed.value = userStore.getGamesPlayed;
};
</script>

<template>
  <div>
    <div class="flex flex-col items-center">
      <h3 class="text-2xl font-bold text-center text-primary">Games Played</h3>
      <GameFilters
        @apply-filters="applyFilters"
        @clear-filters="clearFilters" />
    </div>
    <div class="flex flex-col">
      <template v-for="year in yearsPlayed">
        <div class="mt-7 flex flex-col gap-2">
          <h4
            class="w-fit text-xl font-bold text-primary bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent">
            {{ year }}
          </h4>
          <div class="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
            <template
              v-for="game in gamesPlayed.filter(
                (game) => game.yearPlayed === year
              )">
              <GameCardCompact view="played" :game="game" />
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
