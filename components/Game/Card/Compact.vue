<script lang="ts" setup>
import type { UserGame, Game } from "@/types/game.interfaces";
import type { View } from "@/types/common.interfaces";
import NotFound from "@/public/img/notFound.png";

const emit = defineEmits(["close"]);
const props = defineProps({
  game: {
    type: Object as () => UserGame | Game,
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
const imgSrc = computed(() => {
  if (props.game.image) return props.game.image;
  if (props.game.screenshots && props.game.screenshots.length > 0)
    return props.game.screenshots[0];
  return NotFound;
});

const handleClose = () => {
  isOpen.value = false;
  emit("close");
};
</script>

<template>
  <div
    class="grid grid-cols-3 items-center gap-2 w-full bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden h-[88px] sm:min-h-[88px] cursor-pointer"
    @click="isOpen = true"
  >
    <NuxtImg
      :src="imgSrc"
      preload
      loading="lazy"
      placeholder
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
      <div v-if="view === 'played' && 'monthPlayed' in game" class="flex gap-2">
        <p class="text-xs">
          Played: {{ game.monthPlayed + " - " + game.yearPlayed }}
        </p>
        <p class="text-xs">Status: {{ game.status }}</p>
      </div>
    </div>
  </div>
  <UModal v-model="isOpen">
    <GameCardFull :view="view" :id="game.id">
      <template #buttons>
        <ButtonGroup :view="view" :game="game" @close="handleClose" />
      </template>
    </GameCardFull>
  </UModal>
</template>
