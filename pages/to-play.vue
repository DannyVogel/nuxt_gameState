<script lang="ts" setup>
const listStore = useListStore();
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold text-center text-primary">Games To Play</h3>
    <div class="mt-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="game in listStore.gamesToPlay">
        <GameCardCompact view="to-play" :game="game" />
      </template>
    </div>
  </div>
</template>
