<script lang="ts" setup>
const userStore = useUserStore();
const sort = ref("asc");

const sortedGames = computed(() => {
  return userStore.getGamesToPlay.sort((a, b) => {
    if (sort.value === "asc") {
      return a.released.localeCompare(b.released);
    } else {
      return b.released.localeCompare(a.released);
    }
  });
});
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold text-center text-primary">Games To Play</h3>
    <div class="mt-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="game in sortedGames">
        <GameCardCompact :game="game" />
      </template>
    </div>
  </div>
</template>
