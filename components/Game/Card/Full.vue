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
</script>

<template>
  <Transition name="fade">
    <UCard v-if="status === 'pending'" class="w-full overflow-hidden">
      <atom-spinner
        :animation-duration="1000"
        :size="50"
        :color="'rgb(59 130 246 / 0.5)'"
        class="mx-auto"
      />
    </UCard>
    <UCard
      v-else-if="status === 'success' && game"
      class="w-full overflow-hidden"
    >
      <template #header>
        <GameGallery :game="game" />
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
        <div
          v-if="view === 'played' && isUserGame(game)"
          class="flex flex-col gap-2"
        >
          <p class="text-sm">
            Played: {{ game.monthPlayed + " - " + game.yearPlayed }}
          </p>
          <p class="text-sm">Comments: {{ game.comments }}</p>
        </div>
        <p class="text-sm">
          <a
            :href="`https://www.igdb.com/games/${game.slug}`"
            target="_blank"
            class="underline hover:text-primary"
            >Full details</a
          >
        </p>
      </div>
      <template #footer> <slot name="buttons" /> </template>
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
  transform: scale(0.9);
}
</style>
