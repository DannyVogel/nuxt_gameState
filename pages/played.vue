<script lang="ts" setup>
const userStore = useUserStore();
const years = ref<Set<number>>(new Set());

onMounted(() => {
  years.value = new Set(
    userStore.getGamesPlayed
      .map((game) => game.yearPlayed)
      .sort((a, b) => b - a)
  );
});
</script>

<template>
  <h3 class="text-2xl font-bold text-center text-primary">Games Played</h3>
  <div class="flex flex-col gap-4">
    <template v-for="year in years">
      <div class="flex flex-col gap-2">
        <h4
          class="w-fit text-xl font-bold text-primary bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent"
        >
          {{ year }}
        </h4>
        <div class="flex flex-col gap-1">
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
</template>
