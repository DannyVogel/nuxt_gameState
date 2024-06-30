<script lang="ts" setup>
import type { Game } from "~/types/game.interfaces";
defineProps({
  game: {
    type: Object as () => Game,
    required: true,
  },
});
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="game.screenshots"
    :prev-button="{
      color: 'gray',
      icon: 'i-heroicons-chevron-left-20-solid',
      class: 'w-5 h-5 flex items-center justify-center left-2',
    }"
    :next-button="{
      color: 'gray',
      icon: 'i-heroicons-chevron-right-20-solid',
      class: 'w-5 h-5 flex items-center justify-center right-2',
    }"
    arrows
    indicators
    :ui="{ item: 'basis-full' }"
  >
    <img :src="item" draggable="false" />
  </UCarousel>
</template>
