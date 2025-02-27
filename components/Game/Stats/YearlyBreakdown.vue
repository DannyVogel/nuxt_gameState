<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  yearlyBreakdown: {
    type: Object as () => Record<string, number>,
    required: true,
  },
});

// Sort yearly breakdown by year (descending)
const sortedYearlyBreakdown = computed(() => {
  return Object.entries(props.yearlyBreakdown)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .reduce((acc, [year, count]) => {
      acc[year] = count;
      return acc;
    }, {} as Record<string, number>);
});

// Calculate yearly bar width (max width: 200px)
function calculateYearlyBarWidth(count: number): string {
  const maxWidth = 200;
  const maxValue = Math.max(...Object.values(props.yearlyBreakdown));
  const width = maxValue > 0 ? (count / maxValue) * maxWidth : 0;
  return `${width}px`;
}
</script>

<template>
  <div
    class="backdrop-blur-sm bg-black/30 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-300"
  >
    <h3 class="text-xl font-bold mb-4 text-white flex items-center">
      <UIcon name="i-ph-calendar" class="mr-2 text-primary" />
      Yearly Breakdown
    </h3>
    <div class="flex flex-col space-y-3 overflow-y-auto max-h-60 pr-2">
      <div
        v-for="(count, year) in sortedYearlyBreakdown"
        :key="year"
        class="flex items-center gap-3 group"
      >
        <span class="w-12 text-right text-gray-300">{{ year }}</span>
        <div
          class="flex-1 h-4 bg-gray-700/50 rounded-full overflow-hidden group-hover:bg-gray-600/60 transition-colors duration-200"
        >
          <div
            class="h-full bg-primary/80 group-hover:bg-primary rounded-full transition-all duration-300"
            :style="{ width: calculateYearlyBarWidth(count) }"
          ></div>
        </div>
        <span class="font-bold w-7 text-primary">{{ count }}</span>
      </div>
    </div>
  </div>
</template>
