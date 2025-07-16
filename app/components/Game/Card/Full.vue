<script lang="ts" setup>
import { AtomSpinner } from "epic-spinners";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  view: {
    type: String as () => View,
    required: true,
    validator: (value: View) =>
      ["played", "to-play", "search-query"].includes(value),
  },
});

const { getGameById, updateGameById } = useGameList();

const { data: game, status } = await useAsyncData(
  "game",
  () => getGameById(props.id.toString()),
  { lazy: true }
);

const isUserGame = (game: Game | UserGame): game is UserGame =>
  (game as UserGame).status !== undefined;

const isReleased = (date: string) => {
  return new Date(date) <= new Date();
};

const platformList = computed(() => {
  if (!game.value) return "";
  if (!game.value.platforms) return "";
  if (game.value.platforms.length === 0) return "";
  return game.value.platforms
    .map((platform) => platformShortName(platform))
    .join(", ");
});

const updateGame = async () => {
  try {
    const res = await updateGameById(props.id.toString());
    if (res) game.value = res;
  } catch (error) {
    console.error("Error updating game", error);
  }
};
</script>

<template>
  <UCard
    class="w-full overflow-hidden backdrop-blur-sm bg-black/30 hover:bg-black/40 transition-all duration-300"
  >
    <template #header>
      <GameGallery
        v-if="status === 'success' && game"
        :game="game"
      />
    </template>
    <div
      v-if="status === 'pending'"
      class="min-h-[300px] flex items-center justify-center"
    >
      <atom-spinner
        :animation-duration="1000"
        :size="100"
        :color="'rgb(59 130 246 / 0.5)'"
        class="mx-auto"
      />
    </div>
    <div
      v-if="status === 'success' && game"
      class="flex flex-col gap-2 px-4"
    >
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold text-white drop-shadow-lg">
          {{ game.name }}
        </h1>
        <UIcon
          name="i-ph-arrows-clockwise"
          class="cursor-pointer hover:text-primary-500 transition-colors duration-200 hover:animate-spin"
          @click="updateGame"
        />
      </div>
      <div class="flex gap-2 flex-wrap">
        <template v-for="genre in game.genres">
          <div
            class="rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 max-w-fit px-3 py-1 text-nowrap hover:bg-primary/20 transition-colors duration-200"
          >
            <p class="text-sm font-medium">{{ genre }}</p>
          </div>
        </template>
      </div>

      <div class="space-y-2">
        <div class="flex items-center gap-2 text-sm">
          <UIcon
            name="i-ph-game-controller"
            class="flex-shrink-0"
          />
          <p class="text-sm font-medium">{{ platformList }}</p>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-300">
          <UIcon name="i-ph-calendar-blank" />
          <span v-if="game.released === 'TBA'">TBA</span>
          <span v-else>
            {{
              new Date(game.released).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </span>
        </div>
        <div
          v-if="view === 'played' && isUserGame(game)"
          class="space-y-2"
        >
          <div class="flex items-center gap-2 text-sm text-gray-300">
            <UIcon
              name="i-ph-trophy"
              class="flex-shrink-0"
            />
            <span>{{ game.monthPlayed + " - " + game.yearPlayed }}</span>
          </div>
          <div
            v-if="game.comments"
            class="flex items-start gap-2 text-sm text-gray-300"
          >
            <UIcon
              name="i-ph-chat-circle"
              class="mt-1 flex-shrink-0"
            />
            <p>{{ game.comments }}</p>
          </div>
        </div>

        <a
          :href="`https://www.igdb.com/games/${game.slug}`"
          target="_blank"
          class="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-500 transition-colors duration-200"
        >
          <span>View on IGDB</span>
          <UIcon name="i-ph-arrow-up-right" />
        </a>
      </div>
    </div>

    <template #footer>
      <div
        v-if="status === 'success' && game"
        class="px-4"
      >
        <slot name="buttons" />
      </div>
    </template>
  </UCard>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
