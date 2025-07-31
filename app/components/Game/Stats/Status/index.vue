<script setup lang="ts">
type StatusBreakdown = GameStats["statusBreakdown"];

defineProps({
  statusBreakdown: {
    type: Object as () => StatusBreakdown,
    required: true,
    validator: (value: unknown) => {
      const val = value as StatusBreakdown;
      return (
        "beat" in val && "playing" in val && "toPlay" in val && "dropped" in val
      );
    },
  },
  totalGames: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    class="backdrop-blur-sm bg-black/30 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-300"
  >
    <h3 class="text-xl font-bold mb-4 text-white flex items-center">
      <UIcon name="i-ph-chart-pie" class="mr-2 text-primary" />
      Game Status
    </h3>
    <div class="flex items-center justify-around flex-col sm:flex-row gap-4">
      <GameStatsStatusChart
        :status-breakdown="statusBreakdown"
        :total-games="totalGames"
      />

      <div class="grid grid-cols-2 sm:grid-cols-1 gap-2 w-full sm:w-auto">
        <NuxtLink
          to="/played?status=beat"
          class="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span class="w-3 h-3 rounded-full bg-green-400 flex-shrink-0"></span>
          <span class="text-gray-300 whitespace-nowrap"
            >Beat ({{ statusBreakdown.beat }})</span
          >
        </NuxtLink>
        <NuxtLink
          to="/played?status=playing"
          class="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span class="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></span>
          <span class="text-gray-300 whitespace-nowrap"
            >Playing ({{ statusBreakdown.playing }})</span
          >
        </NuxtLink>
        <NuxtLink
          to="/to-play"
          class="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span class="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></span>
          <span class="text-gray-300 whitespace-nowrap"
            >To Play ({{ statusBreakdown.toPlay }})</span
          >
        </NuxtLink>
        <NuxtLink
          to="/played?status=dropped"
          class="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <span class="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></span>
          <span class="text-gray-300 whitespace-nowrap"
            >Dropped ({{ statusBreakdown.dropped }})</span
          >
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
