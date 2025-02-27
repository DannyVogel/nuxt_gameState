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

const hasActivity = computed(() => {
  return props.recentActivity.some((month) => month.count > 0);
});

function calculateActivityBarHeight(count: number): string {
  if (!hasActivity.value) return "0px";

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

    <div v-if="!hasActivity" class="text-center py-6">
      <UIcon name="i-ph-calendar-x" class="text-gray-500 text-3xl mb-3" />
      <p class="text-gray-400">No recent activity in the last 6 months</p>
      <p class="text-gray-500 text-sm mt-2 mb-4">
        To track your gaming activity, add the month and year when adding or
        editing games
      </p>

      <!-- Show empty chart with month labels -->
      <div
        class="flex justify-between items-end h-24 overflow-x-auto pb-2 mt-6"
      >
        <div
          v-for="(month, index) in recentActivity"
          :key="index"
          class="flex flex-col items-center min-w-16 px-2"
        >
          <div class="text-xs mb-2 text-gray-500">{{ month.monthYear }}</div>
          <div class="w-6 bg-gray-700/30 rounded h-4"></div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex justify-between items-end h-40 overflow-x-auto pb-2"
    >
      <div
        v-for="(month, index) in recentActivity"
        :key="index"
        class="flex flex-col items-center min-w-16 px-2"
      >
        <div class="text-xs mb-2 text-gray-300 text-center">
          {{ month.monthYear }}
        </div>
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
