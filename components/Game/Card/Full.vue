<script lang="ts" setup>
import type { Game, UserGame } from "@/types/game.interfaces";
import type { View } from "@/types/common.interfaces";
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

const { getGameById } = useGameList();

const {
  data: game,
  status,
  error,
  refresh,
} = await useAsyncData("game", () => getGameById(props.id.toString()), {
  lazy: true,
});

const isUserGame = (game: Game | UserGame): game is UserGame =>
  (game as UserGame).status !== undefined;

const isReleased = (date: string) => {
  return new Date(date) <= new Date();
};

const platformList = computed(() => {
  return game.value?.platforms
    .map((platform) => platformShortName(platform))
    .join(", ");
});
</script>

<template>
  <Transition name="fade">
    <UCard
      v-if="status === 'pending'"
      class="w-full overflow-hidden backdrop-blur-sm bg-black/30"
    >
      <atom-spinner
        :animation-duration="1000"
        :size="50"
        :color="'rgb(59 130 246 / 0.5)'"
        class="mx-auto"
      />
    </UCard>
    <UCard
      v-else-if="status === 'success' && game"
      class="w-full overflow-hidden backdrop-blur-sm bg-black/30 hover:bg-black/40 transition-all duration-300"
    >
      <template #header>
        <GameGallery :game="game" />
      </template>

      <div class="flex flex-col gap-2 px-4">
        <h1 class="text-2xl font-bold text-white drop-shadow-lg">
          {{ game.name }}
        </h1>
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
            <UIcon name="i-ph-game-controller" class="flex-shrink-0" />
            <p class="text-sm font-medium">{{ platformList }}</p>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-300">
            <UIcon name="i-ph-calendar-blank" />
            <span>
              {{
                new Date(game.released).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </span>
          </div>
          <div v-if="view === 'played' && isUserGame(game)" class="space-y-2">
            <div class="flex items-center gap-2 text-sm text-gray-300">
              <UIcon name="i-ph-trophy" class="flex-shrink-0" />
              <span>{{ game.monthPlayed + " - " + game.yearPlayed }}</span>
            </div>
            <div
              v-if="game.comments"
              class="flex items-start gap-2 text-sm text-gray-300"
            >
              <UIcon name="i-ph-chat-circle" class="mt-1 flex-shrink-0" />
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
        <div class="px-4">
          <slot name="buttons" />
        </div>
      </template>
    </UCard>
  </Transition>
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
