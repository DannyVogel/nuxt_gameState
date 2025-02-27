<script setup lang="ts">
const { getGameStats } = useGameList();

const {
  data: stats,
  status,
  error,
  refresh: refetchStats,
} = useAsyncData("game-stats", () => getGameStats());

// Computed property for user-friendly error message
const errorMessage = computed(() => {
  if (!error.value) return null;
  return error.value.message || "Failed to load game statistics";
});
</script>

<template>
  <div
    v-if="status === 'pending'"
    class="flex justify-center items-center py-10"
  >
    <div
      class="w-10 h-10 border-4 border-gray-200 border-l-primary rounded-full animate-spin"
    ></div>
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
    <!-- Summary and Status Cards -->
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

    <!-- Genres and Platforms Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GameStatsGenres :genres="stats.mostPlayedGenres" />
      <GameStatsPlatforms :platforms="stats.mostPlayedPlatforms" />
    </div>

    <!-- Recent Activity Card -->
    <GameStatsActivity :recent-activity="stats.recentActivity" />

    <!-- Yearly Breakdown Card -->
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
