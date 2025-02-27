<script setup lang="ts">
interface ActivityMonth {
  monthYear: string;
  count: number;
}

const props = defineProps({
  recentActivity: {
    type: Array as () => ActivityMonth[],
    required: true,
  },
});

// Calculate activity bar height (max height: 100px)
function calculateActivityBarHeight(count: number): string {
  const maxHeight = 100;
  const maxValue = Math.max(...props.recentActivity.map((a) => a.count));
  const height = maxValue > 0 ? (count / maxValue) * maxHeight : 0;
  return `${height}px`;
}
</script>

<template>
  <div
    class="backdrop-blur-sm bg-black/30 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-300"
  >
    <h3 class="text-xl font-bold mb-4 text-white flex items-center">
      <UIcon name="i-ph-clock" class="mr-2 text-primary" />
      Recent Activity
    </h3>
    <div class="flex justify-between items-end h-40 overflow-x-auto pb-2">
      <div
        v-for="(month, index) in recentActivity"
        :key="index"
        class="flex flex-col items-center min-w-16 px-2"
      >
        <div class="text-xs mb-2 text-gray-300">{{ month.monthYear }}</div>
        <div
          class="w-6 bg-gray-700/50 rounded flex items-end transition-all hover:bg-gray-600/60"
        >
          <div
            class="w-full bg-primary/80 hover:bg-primary rounded transition-all duration-300"
            :style="{ height: calculateActivityBarHeight(month.count) }"
          ></div>
        </div>
        <div class="text-xs mt-2 text-gray-300">{{ month.count }}</div>
      </div>
    </div>
  </div>
</template>
