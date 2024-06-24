<script lang="ts" setup>
import type { Game } from "@/types/game.interfaces";
import NotFound from "@/public/img/notFound.png";
defineProps({
  game: {
    type: Object as () => Game,
    required: true,
  },
});
</script>

<template>
  <UCard class="w-full overflow-hidden">
    <template #header>
      <img
        :src="game.image || NotFound"
        :alt="game.name"
        class="object-cover min-h-40"
      />
    </template>
    <div class="flex flex-col gap-2">
      <h1
        class="bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent text-lg font-bold text-center"
      >
        {{ game.name }}
      </h1>
      <div class="flex gap-2 flex-wrap">
        <template v-for="platform in game.platforms">
          <div
            class="rounded-lg border border-white max-w-fit px-2 py-1 text-nowrap"
          >
            <p class="text-xs">{{ platformShortName(platform) }}</p>
          </div>
        </template>
        <template v-for="genre in game.genres">
          <div
            class="rounded-lg border border-white max-w-fit px-2 py-1 text-nowrap"
          >
            <p class="text-xs">{{ genre }}</p>
          </div>
        </template>
      </div>
      <p class="text-sm">Released: {{ game.released }}</p>
      <p class="text-sm">
        <a
          :href="`https://www.igdb.com/games/${game.slug}`"
          class="underline hover:text-primary"
          >Full details</a
        >
      </p>
    </div>
    <template #footer> <slot name="buttons" /> </template>
  </UCard>
</template>
