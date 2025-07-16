<script lang="ts" setup>
import NotFound from "/img/notFound.png";

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
  if (props.game.imageId) return getImageThumbnail(props.game.imageId);
  if (props.game.screenshotIds[0])
    return getImageThumbnail(props.game.screenshotIds[0]);
  return NotFound;
});

const handleClose = () => {
  isOpen.value = false;
  emit("close");
};

const isReleased = (date: string) => {
  return new Date(date) <= new Date();
};
</script>

<template>
  <div
    class="grid grid-cols-3 items-center gap-2 w-full bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden h-[88px] sm:min-h-[88px] cursor-pointer"
    @click="isOpen = true"
  >
    <div class="relative h-full aspect-video bg-gray-900/50 flex-shrink-0">
      <NuxtImg
        :src="imgSrc"
        preload
        loading="lazy"
        placeholder
        alt="game image"
        class="h-full w-full object-cover"
        @error="$event.target.src = NotFound"
      />
    </div>

    <div class="col-span-2 flex flex-col gap-2">
      <h1
        class="bg-gradient-to-l from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent truncate"
      >
        {{ game.name }}
      </h1>
      <div
        v-if="view === 'to-play'"
        class="flex items-center gap-1 text-sm"
      >
        <UIcon
          name="i-ph-calendar-blank"
          class="flex-shrink-0"
        />
        <span>{{ game.released }}</span>
      </div>
      <div
        v-if="view === 'played' && 'monthPlayed' in game"
        class="flex items-center gap-2 text-xs"
      >
        <div class="flex items-center gap-1">
          <UIcon
            name="i-ph-calendar-blank"
            class="flex-shrink-0"
          />
          <p>{{ game.monthPlayed + " - " + game.yearPlayed }}</p>
        </div>
        <div class="flex items-center gap-1">
          <UIcon
            name="i-ph-game-controller"
            class="flex-shrink-0"
          />
          <p>{{ game.status }}</p>
        </div>
      </div>
    </div>
  </div>

  <UModal v-model="isOpen">
    <GameCardFull
      :view="view"
      :id="game.id"
    >
      <template #buttons>
        <ButtonGroup
          :view="view"
          :game="game"
          @close="handleClose"
        />
      </template>
    </GameCardFull>
  </UModal>
</template>

<style scoped>
.group {
  isolation: isolate;
}
</style>
