<script lang="ts" setup>
import type { UserGame } from "@/types/game.interfaces";
import type { View } from "@/types/common.interfaces";
import NotFound from "@/public/img/notFound.png";
defineProps({
  game: {
    type: Object as () => UserGame,
    required: true,
  },
  view: {
    type: String as () => View,
    required: true,
    validator: (value: View) => ["played", "to-play"].includes(value),
  },
});

const route = useRoute();
const isOpen = ref(false);

const view = computed(() => route.name as View);
</script>

<template>
  <div
    class="grid grid-cols-3 items-center gap-2 w-full bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden min-h-[88px] cursor-pointer"
    @click="isOpen = true"
  >
    <img
      :src="game.image || NotFound"
      alt="game image"
      class="object-cover w-full h-full"
    />
    <div class="col-span-2 flex flex-col gap-2">
      <h1
        class="bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent truncate"
      >
        {{ game.name }}
      </h1>
      <p v-if="view === 'to-play'" class="text-sm">
        Release date: {{ game.released }}
      </p>
      <div v-if="view === 'played'" class="flex gap-2">
        <p class="text-xs">
          Played: {{ game.monthPlayed + " - " + game.yearPlayed }}
        </p>
        <p class="text-xs">Status: {{ game.status }}</p>
      </div>
    </div>
  </div>
  <UModal v-model="isOpen">
    <GameCardFull :view="view" :game="game">
      <template #buttons>
        <ButtonGroup :view="view" :game="game" />
      </template>
    </GameCardFull>
  </UModal>
</template>
