<script lang="ts" setup>
const userStore = useUserStore();
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold text-center text-primary">Games Played</h3>
    <div class="flex flex-col">
      <template v-for="year in userStore.getYearsPlayed">
        <div class="mt-7 flex flex-col gap-2">
          <h4
            class="w-fit text-xl font-bold text-primary bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent"
          >
            {{ year }}
          </h4>
          <div class="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
            <template
              v-for="game in userStore.getGamesPlayed.filter(
                (game) => game.yearPlayed === year
              )"
            >
              <GameCardCompact view="played" :game="game" />
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
