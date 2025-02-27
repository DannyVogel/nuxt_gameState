<script setup lang="ts">
import { AtomSpinner } from "epic-spinners";

const { getGameStats } = useGameList();

const {
  data: stats,
  status,
  error,
  refresh: refetchStats,
} = useAsyncData("game-stats", () => getGameStats());

const errorMessage = computed(() => {
  if (!error.value) return null;
  return error.value.message || "Failed to load game statistics";
});
</script>

<template>
  <div
    v-if="status === 'pending'"
    class="flex justify-center items-center mt-10"
  >
    <atom-spinner
      :animation-duration="1000"
      :size="50"
      :color="'rgb(59 130 246 / 0.5)'"
      class="mx-auto"
    />
  </div>

  <div
    v-else-if="error"
    class="backdrop-blur-sm bg-black/30 rounded-lg p-8 text-center"
  >
    <UIcon name="i-ph-warning-circle" class="text-red-500 text-3xl mb-3" />
    <p class="text-red-500 mb-4">{{ errorMessage }}</p>
    <UButton
      @click="refetchStats()"
      color="primary"
      icon="i-ph-arrow-clockwise"
      class="bg-primary/80 hover:bg-primary transition-colors duration-200"
    >
      Try Again
    </UButton>
  </div>

  <div v-else-if="stats" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GameStatsSummary
        :total-games="stats.totalGames"
        :completion-rate="stats.completionRate"
      />
      <GameStatsStatus
        :status-breakdown="stats.statusBreakdown"
        :total-games="stats.totalGames"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GameStatsGenres :genres="stats.mostPlayedGenres" />
      <GameStatsActivity :recent-activity="stats.recentActivity" />
    </div>

    <GameStatsYearlyBreakdown :yearly-breakdown="stats.yearlyBreakdown" />
  </div>

  <div v-else class="backdrop-blur-sm bg-black/30 rounded-lg p-8 text-center">
    <UIcon name="i-ph-game-controller" class="text-3xl text-primary mb-3" />
    <p class="text-gray-300">
      No game statistics available. Add some games to your collection to see
      stats!
    </p>
  </div>
</template>
