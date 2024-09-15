<script lang="ts" setup>
import type { UserGame } from "~/types/game.interfaces";

const db = useDb();
const gamesToPlay = ref<UserGame[]>(db.getGamesToPlay.value);
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold text-center text-primary">Games To Play</h3>
    <div class="mt-10 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
      <template v-for="game in gamesToPlay">
        <GameCardCompact view="to-play" :game="game" />
      </template>
    </div>
  </div>
</template>
