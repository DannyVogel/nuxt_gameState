<script setup lang="ts">
defineProps({
  totalGames: {
    type: Number,
    required: true,
  },
  completionRate: {
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
      <UIcon name="i-ph-chart-line" class="mr-2 text-primary" />
      Summary
    </h3>
    <div class="flex justify-around">
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center mb-2">
          <UIcon name="i-ph-game-controller" class="text-primary text-2xl" />
        </div>
        <span class="text-sm text-gray-300 mb-1">Total Games</span>
        <span class="text-2xl font-bold text-white">{{ totalGames }}</span>
      </div>

      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center mb-2">
          <UIcon name="i-ph-trophy" class="text-yellow-500 text-2xl" />
        </div>
        <span class="text-sm text-gray-300 mb-1">Completion Rate</span>
        <div class="flex items-center">
          <span class="text-2xl font-bold text-white"
            >{{ completionRate }}%</span
          >
          <UIcon
            v-if="completionRate >= 75"
            name="i-ph-star-fill"
            class="text-yellow-500 ml-1"
          />
        </div>
      </div>
    </div>
  </div>
</template>
